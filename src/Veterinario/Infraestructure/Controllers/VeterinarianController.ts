import { Request, Response } from 'express';
import { VeterinarianService } from '../../Application/UseCases/CreateVeterinarianUseCase';
import multer from 'multer';

export class VeterinarianController {
    private veterinarianService: VeterinarianService;

    constructor(veterinarianService: VeterinarianService) {
        this.veterinarianService = veterinarianService;
    }

    // Crear un nuevo veterinario
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;
            const veterinarian = await this.veterinarianService.registerVeterinarian(data);
            return res.status(201).json(veterinarian);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(400).json({ message: 'An unknown error occurred' });
        }
    }

    // Método para subir la imagen de la licencia
    public async uploadLicenseImage(req: Request, res: Response): Promise<Response> {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'No se ha subido ningún archivo' });
            }
            const imageBuffer = req.file.buffer;
            const imageUrl = await this.veterinarianService.uploadLicenseImage(imageBuffer); // Método en el servicio
            return res.status(201).json({ imageUrl });
        } catch (error) {
            if (error instanceof multer.MulterError) {
                // Errores específicos de multer, como límite de tamaño de archivo
                return res.status(400).json({ message: `Error de carga: ${error.message}` });
            } else if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Ocurrió un error desconocido' });
        }
    }

    // Obtener un veterinario por ID
    public async getVeterinarianById(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id, 10);
            const veterinarian = await this.veterinarianService.getVeterinarianById(id);
            if (!veterinarian) {
                return res.status(404).json({ message: 'Veterinarian not found' });
            }
            return res.json(veterinarian);
        } catch (error) {
            return res.status(500).json({ message: 'Server error' });
        }
    }

    // Obtener un veterinario por UUID
    public async getVeterinarianByUuid(req: Request, res: Response): Promise<Response> {
        try {
            const uuid = req.params.uuid;
            const veterinarian = await this.veterinarianService.getVeterinarianByUuid(uuid);
            if (!veterinarian) {
                return res.status(404).json({ message: 'Veterinarian not found' });
            }
            return res.json(veterinarian);
        } catch (error) {
            return res.status(500).json({ message: 'Server error' });
        }
    }

    // Actualizar un veterinario
    public async updateVeterinarian(req: Request, res: Response): Promise<Response> {
        try {
            const uuid = req.params.uuid;
            const data = req.body;
            const veterinarian = await this.veterinarianService.updateVeterinarian(uuid, data);
            if (!veterinarian) {
                return res.status(404).json({ message: 'Veterinarian not found' });
            }
            return res.json(veterinarian);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(400).json({ message: 'An unknown error occurred' });
        }
    }

    // Eliminar un veterinario
    public async deleteVeterinarian(req: Request, res: Response): Promise<Response> {
        try {
            const uuid = req.params.uuid;
            await this.veterinarianService.deleteVeterinarian(uuid);
            return res.status(204).send();
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(400).json({ message: 'An unknown error occurred' });
        }
    }

    // Obtener todos los veterinarios con paginación
    public async getAllVeterinarians(req: Request, res: Response): Promise<Response> {
        try {
            const page = parseInt(req.query.page as string, 10) || 1;
            const limit = parseInt(req.query.limit as string, 10) || 10;
    
            const result = await this.veterinarianService.getAllVeterinarians(page, limit);
            return res.json(result);
        } catch (error) {
            return res.status(500).json({ message: 'Server error' });
        }
    }
}
