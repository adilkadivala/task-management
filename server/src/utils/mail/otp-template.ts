export function otpTemplate(otp: string): string {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Your OTP Code</title>
    <style>
      body {
        font-family: Arial, Helvetica, sans-serif;
        background: #f9fafb;
        color: #1f2937;
        padding: 0;
        margin: 0;
      }
      .container {
        max-width: 480px;
        margin: 40px auto;
        background: #fff;
        border-radius: 10px;
        border: 1px solid #e5e7eb;
        padding: 24px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      }
      h1 {
        font-size: 22px;
        text-align: center;
        color: #3b82f6;
      }
      p {
        font-size: 15px;
        line-height: 1.5;
        text-align: center;
        color: #4b5563;
      }
      .otp {
        font-size: 32px;
        font-weight: 700;
        color: #111827;
        background: #f3f4f6;
        letter-spacing: 6px;
        text-align: center;
        padding: 12px 0;
        margin: 20px 0;
        border-radius: 8px;
      }
      .note {
        font-size: 13px;
        color: #ef4444;
        text-align: center;
      }
      .footer {
        font-size: 12px;
        color: #9ca3af;
        text-align: center;
        margin-top: 24px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Verification Code</h1>
      <p>Use the OTP below to verify your identity. It's valid for 5 minutes.</p>
      <div class="otp">${otp}</div>
      <p class="note">⚠️ Do not share this code with anyone.</p>
      <div class="footer">
        <p>© ${new Date().getFullYear()} Task-flow. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
}
