import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user.service';
import { CreateStudentDTO, ValidateDTO,sendEmailDto,verifyOtp } from '../studentDTO/studentdto.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer'; 
import { promises } from 'dns';




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

    async login(loginData:ValidateDTO,response) : Promise<{message: string}>{
        const user = await this.userService.userLogin(loginData);
        if(!user){
            throw new UnauthorizedException("User not Found");
        }
        const passMatch = await bcrypt.compare(loginData.password, user.password);
        if(!passMatch){
            throw new UnauthorizedException("Invalid Password");
        }
        const payload = await this.jwtService.signAsync(loginData);
        response.cookie('Token',payload,{httpOnly:true});
        return{
            message: "Login Sucessfull",
        };
    }
    

     emailtransport(){
            const transport = nodemailer.createTransport(
              {
                host: 'smtp.gmail.com' ,
                port: 587,
                secure: false,
                auth: {
                    user: 'officeofsports.aiub.bd@gmail.com',
                    pass: 'rizr ddcz skqb ufxu'
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
    
            const { email } = data;
            const otp = this.generateOTP();
            const otpExpiry = Date.now() + 2 * 60 * 1000;
        
           const transporter = this.emailtransport();
           const options: nodemailer.SendMailOptions = {
            from: 'officeofsports.aiub.bd@gmail.com',
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
                    <p>Please use this code to complete your verification.<br>The code is valid for 2 minutes.</p>
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
              return { success: false, message: 'OTP not sent or expired' };
            }
          
            if (Date.now() > otpSession.expiresAt) {
              req.session.otp = null;
              return { success: false, message: 'OTP expired' };
            }
          
            if (otpSession.otp === userOtp.otp) {
              req.session.otp = null; 
              return { success: true, message: 'OTP verified successfully' };
            }
          
            return { success: false, message: 'Invalid OTP' };
        }

}
