import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import path from 'path';

@Controller('image')
export class ImageController {

    // @Get(':src')
    // async serveImage(@Param('src') src: string, @Res() res: Response) {
    //     const imageFilePath = path.join(__dirname, '..', 'src', 'shared', 'assets', 'clothes/', src); //mozda ce trebati da se promeni
    //     return res.sendFile(imageFilePath);
    // }
}
