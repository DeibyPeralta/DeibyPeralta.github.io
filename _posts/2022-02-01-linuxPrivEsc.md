---
title: "tryhackme: Escalar privilegios"
share: false
excerpt: "Aprenda los fundamentos de la escalada de privilegios en Linux. Desde la enumeración hasta la explotación, conozca más de 8 técnicas diferentes de escalada de privilegios."
share: false
header:
  teaser:  /assets/images/linEscPriv/logo.jpg
  teaser_home_page: true
categories:
  - tryhackme
tags:
  - Web Server
  - Gobuster 
---

## ¿Qué significa "escalada de privilegios"?

En esencia, la escalada de privilegios generalmente implica pasar de una cuenta de permisos más bajos a una de permisos más altos.
Más técnicamente, es la explotación de una vulnerabilidad, falla de diseño o supervisión de configuración en un sistema operativo o 
aplicación para obtener acceso no autorizado a recursos que generalmente están restringidos para los usuarios.

### ¿Por qué es importante?

- Es raro que al realizar una prueba de penetración en el mundo real pueda obtener un punto de apoyo (acceso inicial) que le
brinde acceso administrativo directo.  
- La escalada de privilegios es crucial porque le permite obtener niveles de acceso de administrador 
del sistema, lo que le permite realizar acciones como:

1. Restablecimiento de contraseñas
1. Eludir los controles de acceso para comprometer los datos protegidos
1. Edición de configuraciones de software
1. Habilitación de la persistencia
1. Cambiar el privilegio de los usuarios existentes (o nuevos)
1. Ejecutar cualquier comando administrativo 

# Enumeración

La enumeración es el primer paso que debe realizar una vez que obtiene acceso a cualquier sistema. Es posible que haya accedido al 
sistema al explotar una vulnerabilidad crítica que resultó en el acceso a nivel de raíz o simplemente encontró una forma de enviar 
comandos usando una cuenta con pocos privilegios. Los compromisos de pruebas de penetración, a diferencia de las máquinas CTF, no 
terminan una vez que obtiene acceso a un sistema específico o nivel de privilegio de usuario. Como verá, la enumeración es tan 
importante durante la fase posterior al compromiso como lo es antes.

