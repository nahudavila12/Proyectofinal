import { Injectable, NotFoundException } from "@nestjs/common";
import { Property } from "../properties/property.entity";
import { PropertyRepository } from "./property.repository";
import { PropertyFilters } from "src/dtos/propertyFilters.dto";
import { CreatePropertyDto } from "src/dtos/createProperty.dto";
import { PropertyImg } from "./propertyImg.entity";
import { EmailService } from "src/email/services/email/email.service";
import { SendEmailDto } from "src/email/dtos/send-email.dto";




@Injectable()
export class PropertyService {
  constructor(
    private readonly propiertiesRepository: PropertyRepository,
    private readonly cloudinaryService: CloudinaryService,
    private readonly emailService: EmailService,  
  ) {}

  async getProperties(): Promise<Property[]> {
    return this.propiertiesRepository.getProperties(); 

  }

async getPropertyById(uuid: string): Promise<Property> {
    const property = await this.propiertiesRepository.getPropertyById(uuid); 
    if (!property) {
        throw new NotFoundException(`Propiedad con ${uuid} no encontrado`);
    }
    return property; 
}
  async removeProperty(uuid: string): Promise<string> {
    try {
      return await this.propiertiesRepository.removeProperty(uuid);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      console.error('Error eliminando propiedad:', error.message);
      throw new Error('Hubo un problema al eliminar la propiedad');
    }
  }
  
  async banProperty(uuid: string, ban: boolean): Promise<string> {
    try {
      return await this.propiertiesRepository.banProperty(uuid, ban);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      console.error('Error al banear o reactivar propiedad:', error.message);
      throw new Error('Hubo un problema al banear o reactivar la propiedad');
    }
  }

  async updateProperty(uuid: string, updateData: Partial<Property>): Promise<Property> {
    try {
      return await this.propiertiesRepository.updateProperty(uuid, updateData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      console.error('Error actualizando la propiedad:', error.message);
      throw new Error('Hubo un problema al actualizar la propiedad');
    }
  }

  async findPropertiesByFilters(filters: PropertyFilters): Promise<Property[]> {
    try {

      return await this.propiertiesRepository.findPropertiesByFilters(filters);
    } catch (error) {
      console.error('Error buscando propiedades por filtros:', error.message);
      throw new Error('Hubo un problema al buscar las propiedades');
    }
  }

async addProperty(ownerUuid: string, createProperty: CreatePropertyDto, files: Express.Multer.File[]) {
  return await this.propiertiesRepository.addProperty(ownerUuid, createProperty, files)
 

}

  

}


