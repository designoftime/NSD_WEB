import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, mobileNumber, city, serviceNeeded, message } = body;

    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      host: process.env.HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"NSD Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Contact Enquiry from ${fullName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              .container {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 16px;
                overflow: hidden;
              }
              .header {
                background-color: #0d9488; /* teal-600 */
                padding: 40px 32px;
                text-align: center;
              }
              .header h2 {
                color: #ffffff;
                margin: 0;
                font-size: 24px;
                font-weight: 700;
              }
              .logo {
                height: 60px;
                margin-bottom: 16px;
                filter: brightness(0) invert(1);
              }
              .content {
                padding: 32px;
              }
              .section-title {
                font-size: 14px;
                font-weight: 700;
                color: #1a1a1a;
                margin: 24px 0 16px;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                border-bottom: 2px solid #f3f4f6;
                padding-bottom: 8px;
              }
              .grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
              }
              .item {
                margin-bottom: 16px;
              }
              .label {
                font-size: 11px;
                color: #6b7280;
                font-weight: 600;
                text-transform: uppercase;
                margin-bottom: 4px;
              }
              .value {
                font-size: 15px;
                color: #1f2937;
                font-weight: 500;
              }
              .message-box {
                background-color: #f9fafb;
                border-radius: 12px;
                padding: 20px;
                border: 1px solid #e5e7eb;
                margin-top: 8px;
                color: #374151;
                line-height: 1.5;
              }
              .footer {
                padding: 24px 32px;
                background-color: #f9fafb;
                border-top: 1px solid #e5e7eb;
                text-align: center;
                font-size: 12px;
                color: #9ca3af;
              }
                
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
  <table align="center" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center">
        <table
          width="100"
          height="100"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background-color:#ffffff; border-radius:50%; text-align:center;"
        >
          <tr>
            <td align="center" valign="middle">
              <img 
                src="${process.env.IMAGE_BASE_URL}/nsd_logo.png" 
                alt="NSD" 
                width="60" 
                style="display:block;"
              />
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <h2 style="color:#ffffff; margin-top:20px;">
    NSD Enquiry
  </h2>
</div>

              <div class="content">
                <div class="section-title">Personal Information</div>
                <div class="grid">
                  <div class="item">
                    <div class="label">Full Name</div>
                    <div class="value">${fullName}</div>
                  </div>
                  <div class="item">
                    <div class="label">Mobile Number</div>
                    <div class="value">${mobileNumber}</div>
                  </div>
                  <div class="item">
                    <div class="label">Email Address</div>
                    <div class="value">${email}</div>
                  </div>
                  <div class="item">
                    <div class="label">City</div>
                    <div class="value">${city}</div>
                  </div>
                </div>

                <div class="section-title">Enquiry Details</div>
                <div class="grid">
                  <div class="item">
                    <div class="label">Service Needed</div>
                    <div class="value">${serviceNeeded}</div>
                  </div>
                </div>

                <div class="section-title">Message</div>
                <div class="message-box">
                  ${message || "No message provided."}
                </div>
              </div>

              <div class="footer">
                Sent from NSD Portfolio Contact Form &bull; ${new Date().toLocaleDateString()}
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
