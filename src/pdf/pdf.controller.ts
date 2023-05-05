import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get()
  async generatePdf(@Res() response: Response) {
    const html = `
      <html>
        <head>
          <style>
            @font-face {
              font-family: 'Noto Sans JP';
              src: url(https://fonts.gstatic.com/s/notosansjp/v33/-F62fjtqLzI2JPCgQBnw7HFQw74wvg.woff2) format('woff2');
            }
            body {
              font-family: 'Noto Sans JP';
            }
          </style>
        </head>
        <body>
          <h1>こんにちは、世界！</h1>
          <p>これは日本語で表示されるPDFです。</p>
        </body>
      </html>
    `;

    const pdfBuffer = await this.pdfService.generatePdf(html);

    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Disposition', 'inline; filename=output.pdf');
    response.send(pdfBuffer);
  }
}

