INSERT INTO rol (nombre, esadministrador) VALUES ('ADMINISTRADOR',true);
INSERT INTO rol (nombre, esadministrador) VALUES ('CLIENTE',false);
INSERT INTO tipo_objeto (id, descripcion, clase_name) VALUES ('1', 'Entidad', 'Nomina.entity.entities');
INSERT INTO tipo_objeto (id, descripcion, clase_name) VALUES ('2', 'OpcionMenu', 'Nomina.seguridad.persistence.entities.OpcionMenu');

INSERT INTO objeto (nombre_objeto, tipo_objeto_id) VALUES ('Documento', '1');

INSERT INTO objeto (nombre_objeto, tipo_objeto_id) VALUES ('Persona', '1');

INSERT INTO objeto (nombre_objeto, tipo_objeto_id) VALUES ('Proyecto', '1');

INSERT INTO objeto (nombre_objeto, tipo_objeto_id) VALUES ('Contrato', '1');

INSERT INTO objeto (nombre_objeto, tipo_objeto_id) VALUES ('CuentaCobro', '1');

INSERT INTO objeto (nombre_objeto, tipo_objeto_id) VALUES ('Informe', '1');

INSERT INTO objeto (nombre_objeto, tipo_objeto_id) VALUES ('TipoDocumento', '1');

INSERT INTO objeto (nombre_objeto, tipo_objeto_id) VALUES ('TipoContrato', '1');

INSERT INTO objeto (nombre_objeto, tipo_objeto_id) VALUES ('PeriodicidadPago', '1');

INSERT INTO usuario (activo, correo, name, password, username) VALUES (true, 'admin@admin.com', 'admin', 'admin1234', 'admin');
INSERT INTO usuario_roles (usuario_id, rol_id) VALUES
(1, 1); -- Usuario con ID 1 asignado como Administrador
INSERT INTO opcion_menu (nav_cap, display_name, icon_name, route, orden, nombre_objeto) VALUES
('Home', NULL, NULL, NULL, 1, 'Home'),
(NULL, 'Inicio', 'home', '/inicio', 2, 'Inicio'),
('Documento', NULL, NULL, NULL, 3, 'Documento'),
(NULL, 'Ver Documento', 'apps', '/documento', 4, 'Ver Documento'),
(NULL, 'Gestionar Documento', 'list', '/documento/leer', 5, 'Gestionar Documento'),
('Persona', NULL, NULL, NULL, 6, 'Persona'),
(NULL, 'Ver Persona', 'apps', '/persona', 7, 'Ver Persona'),
(NULL, 'Gestionar Persona', 'list', '/persona/leer', 8, 'Gestionar Persona'),
('Proyecto', NULL, NULL, NULL, 9, 'Proyecto'),
(NULL, 'Ver Proyecto', 'apps', '/proyecto', 10, 'Ver Proyecto'),
(NULL, 'Gestionar Proyecto', 'list', '/proyecto/leer', 11, 'Gestionar Proyecto'),
('Contrato', NULL, NULL, NULL, 12, 'Contrato'),
(NULL, 'Ver Contrato', 'apps', '/contrato', 13, 'Ver Contrato'),
(NULL, 'Gestionar Contrato', 'list', '/contrato/leer', 14, 'Gestionar Contrato'),
('CuentaCobro', NULL, NULL, NULL, 15, 'CuentaCobro'),
(NULL, 'Ver CuentaCobro', 'apps', '/cuentacobro', 16, 'Ver CuentaCobro'),
(NULL, 'Gestionar CuentaCobro', 'list', '/cuentacobro/leer', 17, 'Gestionar CuentaCobro'),
('Informe', NULL, NULL, NULL, 18, 'Informe'),
(NULL, 'Ver Informe', 'apps', '/informe', 19, 'Ver Informe'),
(NULL, 'Gestionar Informe', 'list', '/informe/leer', 20, 'Gestionar Informe'),
('TipoDocumento', NULL, NULL, NULL, 21, 'TipoDocumento'),
(NULL, 'Ver TipoDocumento', 'apps', '/tipodocumento', 22, 'Ver TipoDocumento'),
(NULL, 'Gestionar TipoDocumento', 'list', '/tipodocumento/leer', 23, 'Gestionar TipoDocumento'),
('TipoContrato', NULL, NULL, NULL, 24, 'TipoContrato'),
(NULL, 'Ver TipoContrato', 'apps', '/tipocontrato', 25, 'Ver TipoContrato'),
(NULL, 'Gestionar TipoContrato', 'list', '/tipocontrato/leer', 26, 'Gestionar TipoContrato'),
('PeriodicidadPago', NULL, NULL, NULL, 27, 'PeriodicidadPago'),
(NULL, 'Ver PeriodicidadPago', 'apps', '/periodicidadpago', 28, 'Ver PeriodicidadPago'),
(NULL, 'Gestionar PeriodicidadPago', 'list', '/periodicidadpago/leer', 29, 'Gestionar PeriodicidadPago'),
('Gestion de seguridad', NULL, NULL, NULL, 30, 'Gestion de seguridad'),
(NULL, 'Permisos', 'list', '/permisos', 31, 'Permisos'),
(NULL, 'Usuarios', 'list', '/usuarios', 32, 'Usuarios'),
(NULL, 'Roles', 'list', '/roles', 33, 'Roles'),
('Generador de Reportes', NULL, NULL, NULL, 34, 'Generador de Reportes'),
(NULL, 'Reportes', 'list', '/reportes', 35, 'Reportes');
INSERT INTO accion (nombre, descripcion) VALUES
('save', 'Permite crear un nuevo registro'),
('findAll', 'Permite leer registros'),
('update', 'Permite modificar registros'),
('deleteById', 'Permite eliminar registros'),
('ver', 'Permite ver opcion de menu');

-- objetos opción menú

INSERT INTO objeto (tipo_objeto_id, nombre_objeto) VALUES
(2, 'Home'),
(2, 'Inicio'),
(2, 'Documento'),
(2, 'Ver Documento'),
(2, 'Gestionar Documento'),
(2, 'Persona'),
(2, 'Ver Persona'),
(2, 'Gestionar Persona'),
(2, 'Proyecto'),
(2, 'Ver Proyecto'),
(2, 'Gestionar Proyecto'),
(2, 'Contrato'),
(2, 'Ver Contrato'),
(2, 'Gestionar Contrato'),
(2, 'CuentaCobro'),
(2, 'Ver CuentaCobro'),
(2, 'Gestionar CuentaCobro'),
(2, 'Informe'),
(2, 'Ver Informe'),
(2, 'Gestionar Informe'),
(2, 'TipoDocumento'),
(2, 'Ver TipoDocumento'),
(2, 'Gestionar TipoDocumento'),
(2, 'TipoContrato'),
(2, 'Ver TipoContrato'),
(2, 'Gestionar TipoContrato'),
(2, 'PeriodicidadPago'),
(2, 'Ver PeriodicidadPago'),
(2, 'Gestionar PeriodicidadPago'),
(2, 'Gestion de seguridad'),
(2, 'Permisos'),
(2, 'Usuarios'),
(2, 'Roles'),

(2, 'Generador de Reportes'),
(2, 'Reportes');
-- Insertar accion_objeto (relaciona acciones con objetos)

INSERT INTO accion_objeto (accion_id, objeto_id) VALUES
(1, 1), -- Crear documento
(2, 1), -- Leer documento
(3, 1), -- Actualizar documento
(4, 1), -- Eliminar
(1, 2), -- Crear persona
(2, 2), -- Leer persona
(3, 2), -- Actualizar persona
(4, 2), -- Eliminar
(1, 3), -- Crear proyecto
(2, 3), -- Leer proyecto
(3, 3), -- Actualizar proyecto
(4, 3), -- Eliminar
(1, 4), -- Crear contrato
(2, 4), -- Leer contrato
(3, 4), -- Actualizar contrato
(4, 4), -- Eliminar
(1, 5), -- Crear cuentacobro
(2, 5), -- Leer cuentacobro
(3, 5), -- Actualizar cuentacobro
(4, 5), -- Eliminar
(1, 6), -- Crear informe
(2, 6), -- Leer informe
(3, 6), -- Actualizar informe
(4, 6), -- Eliminar
(1, 7), -- Crear tipodocumento
(2, 7), -- Leer tipodocumento
(3, 7), -- Actualizar tipodocumento
(4, 7), -- Eliminar
(1, 8), -- Crear tipocontrato
(2, 8), -- Leer tipocontrato
(3, 8), -- Actualizar tipocontrato
(4, 8), -- Eliminar
(1, 9), -- Crear periodicidadpago
(2, 9), -- Leer periodicidadpago
(3, 9), -- Actualizar periodicidadpago
(4, 9); -- Eliminar

-- cuidado de aqui para adelante ver el id real (para el menu)
INSERT INTO accion_objeto (accion_id, objeto_id) VALUES
(5, 10),
(5, 11),
(5, 12),
(5, 13),
(5, 14),
(5, 15),
(5, 16),
(5, 17),
(5, 18),
(5, 19),
(5, 20),
(5, 21),
(5, 22),
(5, 23),
(5, 24),
(5, 25),
(5, 26),
(5, 27),
(5, 28),
(5, 29),
(5, 30),
(5, 31),
(5, 32),
(5, 33),
(5, 34),
(5, 35),
(5, 36),
(5, 37),
(5, 38),
(5, 39),
(5, 40),
(5, 41),
(5, 42),
(5, 43),
(5, 44);

-- Generar privilegios para los roles dinámicamente

-- Permisos para rol admin
INSERT INTO privilegio (autorizado, accion_objeto_id, rol_id, usuario_id) VALUES
(true, 1, 1, null), -- Crear documento
(true, 2, 1, null), -- Leer documento
(true, 3, 1, null), -- Actualizar documento
(true, 4, 1, null), -- Eliminar documento
(true, 5, 1, null), -- Crear persona
(true, 6, 1, null), -- Leer persona
(true, 7, 1, null), -- Actualizar persona
(true, 8, 1, null), -- Eliminar persona
(true, 9, 1, null), -- Crear proyecto
(true, 10, 1, null), -- Leer proyecto
(true, 11, 1, null), -- Actualizar proyecto
(true, 12, 1, null), -- Eliminar proyecto
(true, 13, 1, null), -- Crear contrato
(true, 14, 1, null), -- Leer contrato
(true, 15, 1, null), -- Actualizar contrato
(true, 16, 1, null), -- Eliminar contrato
(true, 17, 1, null), -- Crear cuentacobro
(true, 18, 1, null), -- Leer cuentacobro
(true, 19, 1, null), -- Actualizar cuentacobro
(true, 20, 1, null), -- Eliminar cuentacobro
(true, 21, 1, null), -- Crear informe
(true, 22, 1, null), -- Leer informe
(true, 23, 1, null), -- Actualizar informe
(true, 24, 1, null), -- Eliminar informe
(true, 25, 1, null), -- Crear tipodocumento
(true, 26, 1, null), -- Leer tipodocumento
(true, 27, 1, null), -- Actualizar tipodocumento
(true, 28, 1, null), -- Eliminar tipodocumento
(true, 29, 1, null), -- Crear tipocontrato
(true, 30, 1, null), -- Leer tipocontrato
(true, 31, 1, null), -- Actualizar tipocontrato
(true, 32, 1, null), -- Eliminar tipocontrato
(true, 33, 1, null), -- Crear periodicidadpago
(true, 34, 1, null), -- Leer periodicidadpago
(true, 35, 1, null), -- Actualizar periodicidadpago
(true, 36, 1, null), -- Eliminar periodicidadpago
(true, 37, 1, null), -- Opción de menú Inicio/Home
(true, 38, 1, null), -- Opción de menú Inicio/Home
(true, 39, 1, null), -- Opción de menú documento
(true, 40, 1, null), -- Ver documento
(true, 41, 1, null), -- Gestionar documento
(true, 42, 1, null), -- Opción de menú persona
(true, 43, 1, null), -- Ver persona
(true, 44, 1, null), -- Gestionar persona
(true, 45, 1, null), -- Opción de menú proyecto
(true, 46, 1, null), -- Ver proyecto
(true, 47, 1, null), -- Gestionar proyecto
(true, 48, 1, null), -- Opción de menú contrato
(true, 49, 1, null), -- Ver contrato
(true, 50, 1, null), -- Gestionar contrato
(true, 51, 1, null), -- Opción de menú cuentacobro
(true, 52, 1, null), -- Ver cuentacobro
(true, 53, 1, null), -- Gestionar cuentacobro
(true, 54, 1, null), -- Opción de menú informe
(true, 55, 1, null), -- Ver informe
(true, 56, 1, null), -- Gestionar informe
(true, 57, 1, null), -- Opción de menú tipodocumento
(true, 58, 1, null), -- Ver tipodocumento
(true, 59, 1, null), -- Gestionar tipodocumento
(true, 60, 1, null), -- Opción de menú tipocontrato
(true, 61, 1, null), -- Ver tipocontrato
(true, 62, 1, null), -- Gestionar tipocontrato
(true, 63, 1, null), -- Opción de menú periodicidadpago
(true, 64, 1, null), -- Ver periodicidadpago
(true, 65, 1, null), -- Gestionar periodicidadpago
(true, 66, 1, null), -- Gestión de seguridad
(true, 67, 1, null), -- Permisos
(true, 68, 1, null), -- Usuarios
(true, 69, 1, null), -- Roles
(true, 70, 1, null), -- Generador de Reportes
(true, 71, 1, null); -- Reportes
-- Permisos para rol cliente
INSERT INTO privilegio (autorizado, accion_objeto_id, rol_id, usuario_id) VALUES
(false, 1, 2, null), -- Crear documento
(false, 2, 2, null), -- Leer documento
(false, 3, 2, null), -- Actualizar documento
(false, 4, 2, null), -- Eliminar documento
(false, 5, 2, null), -- Crear persona
(false, 6, 2, null), -- Leer persona
(false, 7, 2, null), -- Actualizar persona
(false, 8, 2, null), -- Eliminar persona
(false, 9, 2, null), -- Crear proyecto
(false, 10, 2, null), -- Leer proyecto
(false, 11, 2, null), -- Actualizar proyecto
(false, 12, 2, null), -- Eliminar proyecto
(false, 13, 2, null), -- Crear contrato
(false, 14, 2, null), -- Leer contrato
(false, 15, 2, null), -- Actualizar contrato
(false, 16, 2, null), -- Eliminar contrato
(false, 17, 2, null), -- Crear cuentacobro
(false, 18, 2, null), -- Leer cuentacobro
(false, 19, 2, null), -- Actualizar cuentacobro
(false, 20, 2, null), -- Eliminar cuentacobro
(false, 21, 2, null), -- Crear informe
(false, 22, 2, null), -- Leer informe
(false, 23, 2, null), -- Actualizar informe
(false, 24, 2, null), -- Eliminar informe
(false, 25, 2, null), -- Crear tipodocumento
(false, 26, 2, null), -- Leer tipodocumento
(false, 27, 2, null), -- Actualizar tipodocumento
(false, 28, 2, null), -- Eliminar tipodocumento
(false, 29, 2, null), -- Crear tipocontrato
(false, 30, 2, null), -- Leer tipocontrato
(false, 31, 2, null), -- Actualizar tipocontrato
(false, 32, 2, null), -- Eliminar tipocontrato
(false, 33, 2, null), -- Crear periodicidadpago
(false, 34, 2, null), -- Leer periodicidadpago
(false, 35, 2, null), -- Actualizar periodicidadpago
(false, 36, 2, null), -- Eliminar periodicidadpago
(false, 37, 2, null), -- Opción de menú Inicio/Home
(false, 38, 2, null), -- Opción de menú Inicio/Home
(false, 39, 2, null), -- Opción de menú documento
(false, 40, 2, null), -- Ver documento
(false, 41, 2, null), -- Gestionar documento
(false, 42, 2, null), -- Opción de menú persona
(false, 43, 2, null), -- Ver persona
(false, 44, 2, null), -- Gestionar persona
(false, 45, 2, null), -- Opción de menú proyecto
(false, 46, 2, null), -- Ver proyecto
(false, 47, 2, null), -- Gestionar proyecto
(false, 48, 2, null), -- Opción de menú contrato
(false, 49, 2, null), -- Ver contrato
(false, 50, 2, null), -- Gestionar contrato
(false, 51, 2, null), -- Opción de menú cuentacobro
(false, 52, 2, null), -- Ver cuentacobro
(false, 53, 2, null), -- Gestionar cuentacobro
(false, 54, 2, null), -- Opción de menú informe
(false, 55, 2, null), -- Ver informe
(false, 56, 2, null), -- Gestionar informe
(false, 57, 2, null), -- Opción de menú tipodocumento
(false, 58, 2, null), -- Ver tipodocumento
(false, 59, 2, null), -- Gestionar tipodocumento
(false, 60, 2, null), -- Opción de menú tipocontrato
(false, 61, 2, null), -- Ver tipocontrato
(false, 62, 2, null), -- Gestionar tipocontrato
(false, 63, 2, null), -- Opción de menú periodicidadpago
(false, 64, 2, null), -- Ver periodicidadpago
(false, 65, 2, null), -- Gestionar periodicidadpago
(false, 66, 2, null), -- Gestión de seguridad
(false, 67, 2, null), -- Permisos
(false, 68, 2, null), -- Usuarios
(false, 69, 2, null), -- Roles
(false, 70, 2, null), -- Generador de Reportes
(false, 71, 2, null); -- Reportes
INSERT INTO email_configuration (host, port, username, password, auth, starttls_enable) VALUES ('sandbox.smtp.mailtrap.io', 2525, '3ca0e6f0b946f9', '78520f3c31abb6', true, true);
