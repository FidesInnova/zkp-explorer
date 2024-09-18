import { Injectable } from '@nestjs/common';
import { ErrorTypeEnum } from 'src/modules/utility/enums/error-type.enum';
import { GeneralException } from 'src/modules/utility/exceptions/general.exception';
import { uploadFileDto } from '../dto/media-dto';
import { InjectModel } from '@nestjs/mongoose';
import { MediaRepository } from 'src/modules/utility/repositories/media.repository';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel('media')
    private readonly mediaRepository: MediaRepository,
  ) {}

  async insertMedia(
    type: string,
    body: uploadFileDto,
    userId: string,
    file: Express.Multer.File,
  ) {
    const newMedium = {
      user: userId,
      type: type,
      encoding: file.encoding,
      mediaType: file.mimetype,
      destination: file.destination,
      fileName: file.filename,
      path: file.path,
      size: file.size,
      insertedBy: userId,
      insertDate: new Date(),
      updatedBy: userId,
      updateDate: new Date(),
    };

    console.log('We are in Insert media', newMedium);

    try {
      const uploadedFile = await this.mediaRepository.create(newMedium);

      if (uploadedFile) {
        return {
          _id: uploadedFile._id,
          fileName: uploadedFile.fileName,
          path: uploadedFile.path,
          url: `${process.env.HOST_PROTOCOL + process.env.HOST_NAME_OR_IP}/${
            process.env.HOST_SUB_DIRECTORY
          }/${uploadedFile.path}`,
          size: uploadedFile.size,
          type: uploadedFile.type,
          destination: uploadedFile.destination,
          mediaType: uploadedFile.mediaType,
          encoding: uploadedFile.encoding,
        };
      } else {
        throw new GeneralException(
          ErrorTypeEnum.UNPROCESSABLE_ENTITY,
          'An error occurred while uploading the file.',
        );
      }
    } catch (error) {
      console.log(error);

      throw new GeneralException(
        ErrorTypeEnum.INTERNAL_SERVER_ERROR,
        'An error occurred while saving the file to the database.',
      );
    }
  }

  async getMediaById(id: string) {
    try {
      const media = await this.mediaRepository.findById(id);
      if (!media) {
        throw new GeneralException(ErrorTypeEnum.NOT_FOUND, 'Media not found');
      }

      return {
        ...media._doc,
        url: `${process.env.HOST_PROTOCOL + process.env.HOST_NAME_OR_IP}/${
          process.env.HOST_SUB_DIRECTORY
        }/${media.path}`,
      };
    } catch (error) {
      console.log(error);
      throw new GeneralException(
        ErrorTypeEnum.INTERNAL_SERVER_ERROR,
        'An error occurred while retrieving the media.',
      );
    }
  }
}
