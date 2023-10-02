import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import path from 'path';

@Controller('image')
export class ImageController {

    @Get()
    async serveImage(@Param('img') img: string, @Res() res: Response) {
        const imageFilePath = path.join(__dirname, '..', '..', img); //mozda ce trebati da se promeni
        return res.sendFile(imageFilePath);
    }
}
