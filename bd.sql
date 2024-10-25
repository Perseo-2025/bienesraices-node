-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-10-2024 a las 20:02:45
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bienesraices_node_mvc`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'Casa', '2024-05-25 04:50:53', '2024-05-25 04:50:53'),
(2, 'Departamento', '2024-05-25 04:50:53', '2024-05-25 04:50:53'),
(3, 'Bodega', '2024-05-25 04:50:53', '2024-05-25 04:50:53'),
(4, 'Terreno', '2024-05-25 04:50:53', '2024-05-25 04:50:53'),
(5, 'Cabaña', '2024-05-25 04:50:53', '2024-05-25 04:50:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudad`
--

CREATE TABLE `ciudad` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ciudad`
--

INSERT INTO `ciudad` (`id`, `nombre`) VALUES
(1, 'Lima'),
(2, 'Lurin'),
(3, 'SJM'),
(4, 'VMT');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `creditoh`
--

CREATE TABLE `creditoh` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `nMeses` int(11) NOT NULL,
  `aporteCapital` varchar(255) NOT NULL,
  `interes` varchar(255) NOT NULL,
  `cuotaMensual` varchar(255) NOT NULL,
  `saldo` varchar(255) NOT NULL,
  `idPublicacion` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `cronograma` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `id` int(11) NOT NULL,
  `mensaje` varchar(200) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `propiedadId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `usuarioId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `precios`
--

CREATE TABLE `precios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `precios`
--

INSERT INTO `precios` (`id`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, '0 - $10,000 USD', '2024-05-25 04:50:53', '2024-05-25 04:50:53'),
(2, '$10,000 - $30,000 USD', '2024-05-25 04:50:53', '2024-05-25 04:50:53'),
(3, '$30,000 - $50,000 USD', '2024-05-25 04:50:53', '2024-05-25 04:50:53'),
(4, '$50,000 - $75,000 USD', '2024-05-25 04:50:53', '2024-05-25 04:50:53'),
(5, '$75,000 - $100,000 USD', '2024-05-25 04:50:53', '2024-05-25 04:50:53'),
(6, '$100,000 - $150,000 USD', '2024-05-25 04:50:53', '2024-05-25 04:50:53'),
(7, '$150,000 - $200,000 USD', '2024-05-25 04:50:53', '2024-05-25 04:50:53'),
(8, '$200,000 - $300,000 USD', '2024-05-25 04:50:53', '2024-05-25 04:50:53'),
(9, '$300,000 - $500,000 USD', '2024-05-25 04:50:53', '2024-05-25 04:50:53'),
(10, '+ $500,000 USD', '2024-05-25 04:50:53', '2024-05-25 04:50:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propiedades`
--

CREATE TABLE `propiedades` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `habitaciones` int(11) NOT NULL,
  `estacionamiento` int(11) NOT NULL,
  `wc` int(11) NOT NULL,
  `calle` varchar(100) NOT NULL,
  `lat` varchar(255) NOT NULL,
  `lng` varchar(255) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `publicado` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `precioId` int(11) DEFAULT NULL,
  `categoriaId` int(11) DEFAULT NULL,
  `usuarioId` int(11) DEFAULT NULL,
  `idciudad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `propiedades`
--

INSERT INTO `propiedades` (`id`, `titulo`, `descripcion`, `habitaciones`, `estacionamiento`, `wc`, `calle`, `lat`, `lng`, `imagen`, `publicado`, `createdAt`, `updatedAt`, `precioId`, `categoriaId`, `usuarioId`, `idciudad`) VALUES
('00447191-3f49-4ab8-9e16-07e22695b1af', '¡Tu Departamento Ideal en Venta!', 'Con 2 dormitorios, 2 baños, una cocina moderna y un balcón con vista,', 2, 3, 2, 'Calle Pumacahua', '-12.178473410436', '-77.02021770408', '1i3hdk5r49t9t6o7c428.jpg', 1, '2024-07-24 03:47:26', '2024-07-24 03:47:42', 7, 2, 3, NULL),
('1261e27f-0988-4ede-a0f1-d51ddc762c56', 'Oportunidad Única: Hermosa Casa en Venta', 'Descubre esta maravillosa casa que combina elegancia y comodidad. Con 3 dormitorios, 2 baños, una cocina moderna y un amplio jardín.', 3, 1, 2, 'Avenida Miguel Cervantes', '-12.104307817505', '-77.040166542136', '1i3h3j5g9jnqveas7tm.jpg', 1, '2024-07-24 00:52:02', '2024-07-24 00:52:35', 2, 1, 3, NULL),
('36c4740e-f0fa-4b38-aa9f-9241137d12f5', 'Moderno Departamento con Vista Espectacular', 'Este moderno departamento cuenta con 3 dormitorios, 2 baños, una cocina abierta y un amplio balcón.', 3, 2, 2, 'Pasaje Sin Nombre', '-12.183089308526', '-77.019364683432', '1i3hdoorndtmi0rtp3.jpg', 1, '2024-07-24 03:49:59', '2024-07-24 03:50:12', 5, 2, 3, NULL),
('54638d9e-acdd-4736-9ad4-08a4d3ea9228', 'Tu Nuevo Hogar Te Espera Aquí', 'Ofrece 4 habitaciones, 3 baños completos, sala de estar luminosa y un patio trasero espacioso.', 4, 1, 3, 'Avenida México', '-12.17377150393', '-77.020997529667', '1i3h3sn50b8fqoh1568g.jpg', 1, '2024-07-24 00:57:24', '2024-07-24 00:57:36', 4, 1, 3, NULL),
('78efd8a6-5eb8-403e-95a7-7b68e4eccf44', 'Se vende UTP con todo y alumnos', 'asd', 3, 3, 3, 'Avenida Guardia Civil', '-12.180785140782', '-76.998412261875', '1ib2bjslt55nptd0h6cg.jpg', 1, '2024-10-25 17:29:05', '2024-10-25 17:29:33', 10, 1, 7, NULL),
('9613abc7-5a45-4ef6-b9e8-c2b7397069d8', 'Casa de los Avengers', 'casa en remate', 3, 4, 3, 'Calle Perseo', '-12.178644080512', '-77.001038878709', '1ib2d6ctsnc5mgpu124o.jpg', 1, '2024-10-25 17:57:01', '2024-10-25 17:57:19', 9, 1, 8, NULL),
('b8a2fe3e-274f-4144-8a01-46f2cfee2215', 'Vivienda de Ensueño en Zona Exclusiva', ' Con 4 dormitorios, 4 baños, una cocina gourmet ', 4, 2, 4, 'Avenida Defensores del Morro 1625', '-12.1772186', '-77.016078', '1i3h47o5a3ue023afct8.jpg', 1, '2024-07-24 01:03:27', '2024-07-24 01:03:37', 5, 1, 3, NULL),
('d0d9fc3f-6761-4ab2-a611-ac33828664ec', 'Vive en el Corazón de la Ciudad', 'Ubicado en el centro de la ciudad, este departamento te ofrece la comodidad de tener todo a tu alcance. Con 1 dormitorio, 1 baño, ', 1, 1, 1, 'Avenida los Faisanes', '-12.17956095699', '-77.00112362195', '1i3hdm3pbrcr8vvbk85o.jpg', 1, '2024-07-24 03:48:28', '2024-07-24 03:48:45', 4, 2, 3, NULL),
('eebe23ee-64bd-4d36-87a7-45513a028233', 'Espaciosa y Acogedora Residencia Familiar', 'Con 4 habitaciones, 2 baños, una amplia sala de juegos y un patio seguro para los niños. ', 3, 4, 2, 'Avenida Escuela Militar', '-12.163848702741', '-77.019434139273', '1i3hbf9vas85th3rtr1o.jpg', 0, '2024-07-24 03:09:57', '2024-07-24 03:15:06', 4, 1, 4, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `telefono` int(11) NOT NULL,
  `fechaNacimiento` varchar(250) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `confirmado` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `telefono`, `fechaNacimiento`, `email`, `password`, `token`, `confirmado`, `createdAt`, `updatedAt`) VALUES
(1, 'Rey', '', 0, '', 'rey@gmail.com', '$2b$10$qLePNhhmD633iPcNLls3/OezXFgiYaXJOLmf0PXhFya7bZSMxq6m2', NULL, 1, '2024-05-25 04:50:53', '2024-05-25 04:50:53'),
(2, 'Perseo', '', 0, '', 'perseo@gmail.com', '$2b$10$qcl5BB6skeSIfDL3LZVYz.8ORhmQP5TN1kUa2ifEUxz9/wOmO/EpG', NULL, 1, '2024-05-28 16:38:15', '2024-05-28 16:38:20'),
(3, 'Perseo', '', 0, '', 'correo@correo.com', '$2b$10$vMrqqIHQX40ZtnbTMORSUu3z/I9cfcZK0NLjats.joUxkTHbWseDK', NULL, 1, '2024-07-24 00:22:33', '2024-07-24 00:22:50'),
(4, 'Juan', '', 0, '', 'correo2@correo.com', '$2b$10$A3QeQbP7ByUhdlWE56URhuFB0P6X9J5hglL6/KlYrY1CMtyFVYZjC', NULL, 1, '2024-07-24 03:07:24', '2024-07-24 03:07:34'),
(5, 'Jhon ', '', 0, '', 'jhon@gmail.com', '$2b$10$IgXXTqGIsUt1T3847E4fYuCywY/pIdW7MzMFU28OgvqnxhFph8bsO', NULL, 1, '2024-08-23 04:10:02', '2024-08-23 04:10:44'),
(6, 'Efren', '', 0, '', 'efren@gmail.com', '$2b$10$i9qxOvv6C.lxH.pA2MvmW.zRoyR/VncokaeOdu8AAvxBjSq7F9zGa', NULL, 1, '2024-09-06 21:05:36', '2024-09-06 21:05:54'),
(7, 'pepe', 'epep', 964565456, '2024-10-11', 'pepe2@gmail.com', '$2b$10$CbjkYlm2DbEy5nxE9EJOdeDptdXdWi5oGsFrigbmLpzAQwxb9Xw0G', NULL, 1, '2024-10-25 05:19:52', '2024-10-25 05:19:56'),
(8, 'Jimmy', 'Gonzales Flores', 958632546, '2000-06-13', 'jimmy@gmail.com', '$2b$10$0fL6EAaJPMUVRJ8ykp2I7ucA73ru5KutdTJL/J9gY9JMMn6gQPBSi', NULL, 1, '2024-10-25 17:55:36', '2024-10-25 17:55:46');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `creditoh`
--
ALTER TABLE `creditoh`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idPublicacion` (`idPublicacion`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `propiedadId` (`propiedadId`),
  ADD KEY `usuarioId` (`usuarioId`);

--
-- Indices de la tabla `precios`
--
ALTER TABLE `precios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `propiedades`
--
ALTER TABLE `propiedades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `precioId` (`precioId`),
  ADD KEY `categoriaId` (`categoriaId`),
  ADD KEY `usuarioId` (`usuarioId`),
  ADD KEY `idCiudad` (`idciudad`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `creditoh`
--
ALTER TABLE `creditoh`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `precios`
--
ALTER TABLE `precios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `creditoh`
--
ALTER TABLE `creditoh`
  ADD CONSTRAINT `fk_creditoh_propiedades` FOREIGN KEY (`idPublicacion`) REFERENCES `propiedades` (`id`),
  ADD CONSTRAINT `fk_creditoh_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`propiedadId`) REFERENCES `propiedades` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `mensajes_ibfk_2` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `propiedades`
--
ALTER TABLE `propiedades`
  ADD CONSTRAINT `propiedades_ibfk_1` FOREIGN KEY (`precioId`) REFERENCES `precios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `propiedades_ibfk_2` FOREIGN KEY (`categoriaId`) REFERENCES `categorias` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `propiedades_ibfk_3` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `propiedades_ibfk_4` FOREIGN KEY (`idciudad`) REFERENCES `ciudad` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
