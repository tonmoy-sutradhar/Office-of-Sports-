import { BadRequestException, HttpCode, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user.service';
import { CreateStudentDTO, ValidateDTO,resetPassDTO,sendEmailDto,verifyOtp } from '../studentDTO/studentdto.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
    constructor(
        private  userService: UserService, 
        private jwtService : JwtService
    ){}

    async register(createdto:CreateStudentDTO): Promise<any>{

        const hashedPassword = await bcrypt.hash(createdto.password, 8);

        createdto.password = hashedPassword;

        return await this.userService.registerUser(createdto);
    }

    async login(loginData:ValidateDTO,res) : Promise<{message: string,Token:string}>{
        const user = await this.userService.userLogin(loginData);
        if(!user || user.isBanned == true){
            throw new UnauthorizedException("User not Found");
        }
        const passMatch = await bcrypt.compare(loginData.password, user.password);
        if(!passMatch){
            throw new UnauthorizedException("Invalid Password");
        }
        const payload = {
            userId: user.id,            // Assuming the user model has an `id` property
            university_id: user.university_id, // Assuming university_id is available in the user model
        };
        const Token = await this.jwtService.signAsync(payload);
        res.cookie('access_token',Token,{httpOnly:true});
        console.log(payload);
        return{
            message: "Login Sucessfull",Token

        };
    }

    async logout(req, res): Promise<{ message: string }> {
        try {
          res.clearCookie('access_token');
          req.session.destroy((err) => {
            if (err) {
              console.error('Session destroy error:', err);
              throw new Error('Error logging out');
            }
          });
      
          return {
            message: 'Logout Successful',
          };
        } catch (error) {
          console.error('Logout error:', error.message);
          throw new Error('Failed to logout');
        }
      }


     emailtransport(){
            const transport = nodemailer.createTransport(
              {
                host: process.env.EMAIL_HOST,
                port: parseInt(process.env.EMAIL_PORT),
                secure: false,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
              });
            return transport;
        }
    
        generateOTP(): string {
            return Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP
        }

        async forgetPassword(data:sendEmailDto,req):Promise<any>{
        
            const sotredMail = await this.userService.forgetPass(data);

            if(!sotredMail){
                throw new UnauthorizedException("Invalid Email");
            }
            req.session.email = sotredMail.email;
            const { email } = data;
            const otp = this.generateOTP();
            const otpExpiry = Date.now() + 5 * 60 * 1000;
        
           const transporter = this.emailtransport();
           const options: nodemailer.SendMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Recover Your Password',
            html: `
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        padding: 20px;
                    }
                    .container {
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 30px;
                        text-align: center;
                    }
                    h1 {
                        color: #4CAF50;
                    }
                    p {
                        color: #555;
                        font-size: 16px;
                    }
                    .otp {
                        background-color: #f0f8ff;
                        border: 1px solid #b0e0e6;
                        padding: 10px;
                        font-size: 24px;
                        font-weight: bold;
                        border-radius: 5px;
                        color: #333;
                    }
                    .footer {
                        margin-top: 20px;
                        font-size: 12px;
                        color: #888;
                    }
                </style>
            </head>
            <body>
        
                <div class="container">
                    <h1>Your OTP Code</h1>
                    <p>Dear User,</p>
                    <p>Your OTP code is:</p>
                    <div class="otp">${otp}</div>
                    <p>Please use this code to complete your verification.<br>The code is valid for 5 minutes.</p>
                    <div class="footer">
                        <p>Copyright @2024</p>
                    </div>
                </div>
        
            </body>
            </html>
            `,
          };

            try{
              await transporter.sendMail(options);
              req.session.otp = { otp, expiresAt: otpExpiry };
            }
            catch(error){
                throw new UnauthorizedException(error);
            }
    }

    async verifyOTP(userOtp:verifyOtp, req):Promise<any> {
        const otpSession = req.session.otp;
          
            if (!otpSession) {
              throw new BadRequestException('OTP session not found. Please request a new OTP');
            }
          
            if (Date.now() > otpSession.expiresAt) {
              req.session.otp = null;
              throw new BadRequestException('OTP expired. Please request a new OTP');
            }
          
            if (otpSession.otp === userOtp.otp) {
              req.session.otp = null;
              const access_token= await this.jwtService.signAsync(userOtp, { expiresIn: '5m' }); 
              return { success: true, message: 'OTP verified successfully. You have 5 minutes to reset your password',access_token};
            }
          
            throw new BadRequestException('Invalid OTP. Please try again');
    }

    async resetPass(userdata:resetPassDTO,rq)
    {
        const findUser = await this.userService.resetPassword(rq);
        if(!findUser)
        {
            return new NotFoundException("User not found");
        }
        else{
         if (userdata.newPass !== userdata.confirmPass){
            return new BadRequestException("Password and Confirm Password not matched");
         }
         else if(!userdata.newPass || !userdata.confirmPass)
         {
            return new BadRequestException("Password or Confirm Password can  not be empty ");
         }

            const hashedPassword = await bcrypt.hash(userdata.newPass, 8);

            userdata.newPass = hashedPassword;

            const transporter = this.emailtransport();
            const options: nodemailer.SendMailOptions = {
             from: process.env.EMAIL_USER,
             to: rq.session.email,
             subject: 'Security alert: Password Changed',
             html: `
                 <style>
                     body {
                         font-family: Arial, sans-serif;
                         background-color: #f4f4f4;
                         padding: 20px;
                     }
                     .container {
                         background-color: #ffffff;
                         border-radius: 8px;
                         box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                         max-width: 600px;
                         margin: 0 auto;
                         padding: 30px;
                         text-align: center;
                     }
                     h1 {
                         color: #4CAF50;
                     }
                     p {
                         color: #555;
                         font-size: 16px;
                     }
                     .otp {
                         background-color: #f0f8ff;
                         border: 1px solid #b0e0e6;
                         padding: 10px;
                         font-size: 24px;
                         font-weight: bold;
                         border-radius: 5px;
                         color: #333;
                     }
                     .footer {
                         margin-top: 20px;
                         font-size: 12px;
                         color: #888;
                     }
                 </style>
             </head>
             <body>
         
                 <div class="container">
                     <h1>Password Changed</h1>
                     <p>Dear User,</p>
                     <p>Your password has been changed. Now use your new password to login</p>
                     <div class="footer">
                         <p>Copyright @2024</p>
                     </div>
                 </div>
         
             </body>
             </html>
             `,
           };

           try{
            await this.userService.saveResestPassword(rq.session.email,userdata.newPass);
            await transporter.sendMail(options);
            return {message:"Password reset Successfully"};
          }
          catch(error){
              throw new UnauthorizedException(error);
          }
            
        }
    }

    
}
