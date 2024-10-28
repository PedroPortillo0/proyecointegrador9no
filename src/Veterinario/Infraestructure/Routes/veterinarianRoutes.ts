import { Router } from 'express';
import { VeterinarianController } from '../Controllers/VeterinarianController';
import { MySQLVeterinarianRepository } from '../Repositories/MySQLVeterinarianRepository';
import { VeterinarianService } from '../../Application/UseCases/CreateVeterinarianUseCase';
import { upload, validateFileUpload } from '../Middleware/uploadMiddleware'; // Usa el upload directamente aquí

const router = Router();
const veterinarianRepository = new MySQLVeterinarianRepository();
const veterinarianService = new VeterinarianService(veterinarianRepository);
const veterinarianController = new VeterinarianController(veterinarianService);

// Configura las rutas con upload y validateFileUpload
router.post('/create', upload.single('licenseImage'), validateFileUpload, (req, res) => veterinarianController.create(req, res));
router.get('/:id', (req, res) => veterinarianController.getVeterinarianById(req, res));
router.get('/uuid/:uuid', (req, res) => veterinarianController.getVeterinarianByUuid(req, res));
router.put('/update/:uuid', upload.single('licenseImage'), validateFileUpload, (req, res) => veterinarianController.updateVeterinarian(req, res));
router.delete('/delete/:uuid', (req, res) => veterinarianController.deleteVeterinarian(req, res));
router.get('/', (req, res) => veterinarianController.getAllVeterinarians(req, res));

export default router;
