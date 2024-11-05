import { Router } from 'express';
import { VeterinarianController } from '../Controllers/VeterinarianController';
import { MySQLVeterinarianRepository } from '../Repositories/MySQLVeterinarianRepository';
import { VeterinarianService } from '../../Application/UseCases/CreateVeterinarianUseCase';
import { upload } from '../Middleware/uploadMiddleware';

const router = Router();
const veterinarianRepository = new MySQLVeterinarianRepository();
const veterinarianService = new VeterinarianService(veterinarianRepository);
const veterinarianController = new VeterinarianController(veterinarianService);

// Configura las rutas
router.post('/create', (req, res) => veterinarianController.create(req, res));
router.get('/:id', (req, res) => veterinarianController.getVeterinarianById(req, res));
router.get('/uuid/:uuid', (req, res) => veterinarianController.getVeterinarianByUuid(req, res));
router.put('/update/:uuid', (req, res) => veterinarianController.updateVeterinarian(req, res));
router.delete('/delete/:uuid', (req, res) => veterinarianController.deleteVeterinarian(req, res));
router.get('/', (req, res) => veterinarianController.getAllVeterinarians(req, res));

// Archivo de rutas (veterinarianRoutes.js o similar)
router.post('/upload-license-image', upload.single('licenseImage'), (req, res) => {
    veterinarianController.uploadLicenseImage(req, res);
});



export default router;
