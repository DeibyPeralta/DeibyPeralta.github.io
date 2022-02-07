---
title: "Comandos utiles"
share: false
excerpt: "Son solo algunos de los comandos más utiles y/0 utilizados en linux"
share: false
header:
  teaser:  /assets/images/comandosUtiles/logo.jpg
  teaser_home_page: true
categories:
  - Utilidades
tags:
  - utilidades 
---

### hostname

El comando hostname devolverá el nombre de host de la máquina de destino. Aunque este valor se puede cambiar fácilmente o tener una
cadena relativamente sin sentido (p. ej., Ubuntu-3487340239), en algunos casos, puede proporcionar información sobre la función del
sistema de destino dentro de la red corporativa (p. ej., SQL-PROD-01 para un servidor SQL de producción) .


### uname -a

Imprimirá información del sistema que nos brinda detalles adicionales sobre el kernel utilizado por el sistema. Esto será útil al 
buscar posibles vulnerabilidades del kernel que podrían conducir a una escalada de privilegios.


### /proc/versión

El sistema de archivos proc (procfs) proporciona información sobre los procesos del sistema de destino. Encontrará proc en muchos 
sabores diferentes de Linux, lo que lo convierte en una herramienta esencial para tener en su arsenal.

Mirar /proc/version puede brindarle información sobre la versión del kernel y datos adicionales, como si está instalado un 
compilador (por ejemplo, GCC).

### /etc/issue

Los sistemas también se pueden identificar consultando el archivo /etc/issue. Este archivo generalmente contiene información 
sobre el sistema operativo, pero se puede personalizar o cambiar fácilmente. Hablando sobre el tema, cualquier archivo que contenga 
información del sistema se puede personalizar o cambiar. Para una comprensión más clara del sistema, siempre es bueno mirar todos 
estos.

## pd comand

El comando ps es una forma efectiva de ver los procesos en ejecución en un sistema Linux. Escribir ps en su terminal mostrará los 
procesos para el shell actual.

La salida de ps (Estado del proceso) mostrará lo siguiente;

```bash
PID: El ID del proceso (único para el proceso)
TTY: Tipo de terminal utilizado por el usuario
Tiempo: cantidad de tiempo de CPU utilizado por el proceso (este NO es el tiempo que se ha estado ejecutando este proceso)
CMD: el comando o ejecutable en ejecución (NO mostrará ningún parámetro de línea de comando)
```

El comando "ps" proporciona algunas opciones útiles.

```bash
ps -A: Ver todos los procesos en ejecución
ps axjf: Ver el árbol de procesos (ver la formación del árbol hasta que se ejecute ps axjf a continuación)
ps aux: The aux option will show processes for all users (a), display the user that launched the process (u),and show processes  
   that are not attached to a terminal (x). Looking at the ps aux command output, we can have a better 
   understanding of the system and potential vulnerabilities.
```

### env 

El comando env mostrará las variables de entorno.

![](images/linuxPrivEsc/env.png){width='100px'}

La variable PATH puede tener un compilador o un lenguaje de scripting (por ejemplo, Python) que podría ser utilizado para ejecutar código en el sistema de destino o aprovechado para la escalada de privilegios.

### sudo -l

El sistema objetivo puede estar configurado para permitir a los usuarios ejecutar algunos (o todos) los comandos con privilegios de root. El comando sudo -l puede ser usado para listar todos los comandos que el usuario puede ejecutar usando sudo.

### ls

Uno de los comandos más comunes utilizados en Linux es probablemente *ls*.

Al buscar potenciales vectores de escalada de privilegios, recuerde utilizar siempre el comando ls con el parámetro *-la*. El ejemplo de abajo muestra cómo el archivo "secret.txt" puede ser fácilmente pasado por alto usando los comandos ls o *ls -l*.
![imagen ls](https://i.imgur.com/2jOtOat.png)

### Id

El comando id proporcionará una visión general del nivel de privilegios del usuario y su pertenencia a un grupo.

Vale la pena recordar que el comando id también puede ser utilizado para obtener la misma información para otro usuario como se ve a continuación.

![imagen id](https://i.imgur.com/YzfJliG.png)

### /etc/passwd

La lectura del archivo /etc/passwd puede ser una manera fácil de descubrir los usuarios en el sistema.

![imagen passwd](https://i.imgur.com/r6oYOEi.png)

Aunque la salida puede ser larga y un poco intimidante, se puede cortar fácilmente y convertirla en una lista útil para ataques de fuerza bruta.

![brute force passwd](https://i.imgur.com/cpS2U93.png)

Recuerde que esto devolverá todos los usuarios, algunos de los cuales son usuarios del sistema o del servicio que no serían muy útiles. Otro enfoque podría ser buscar "home", ya que los usuarios reales probablemente tendrán sus carpetas en el directorio "home".

![brute force passwd](https://i.imgur.com/psxE6V4.png)

### history

Mirar comandos anteriores con el comando *history* puede darnos alguna idea sobre el sistema de destino y, aunque rara vez, tener información almacenada como _contraseñas_ o nombres de usuario.

### ifconfig

El sistema de destino puede ser un punto de pivote hacia otra red. El comando ifconfig nos dará información sobre las interfaces de red del sistema. El ejemplo siguiente muestra que el sistema objetivo tiene tres interfaces (eth0, tun0 y tun1). Nuestra máquina atacante puede alcanzar la interfaz eth0 pero no puede acceder directamente a las otras dos redes.

![brute force passwd](https://i.imgur.com/hcdZnwK.png)

Esto se puede confirmar utilizando el comando ip route para ver qué rutas de red existen.

![brute force passwd](https://i.imgur.com/PSrmz5O.png)

### netstat

Following an initial check for existing interfaces and network routes, it is worth looking into existing communications. The netstat command can be used with several different options to gather information on existing connections.


Tras una comprobación inicial de las interfaces y rutas de red existentes, merece la pena examinar las comunicaciones existentes. El comando netstat se puede utilizar con varias opciones diferentes para recopilar información sobre las conexiones existentes.


- netstat -a: muestra todos los puertos de escucha y las conexiones establecidas.
También se puede utilizar.
- netstat -at o netstat -au para listar los protocolos TCP o UDP respectivamente.
- netstat -l: lista los puertos en modo "escucha". Estos puertos están abiertos y listos para aceptar conexiones entrantes. Se puede utilizar con la opción "t" para listar sólo los puertos que están a la escucha utilizando el protocolo TCP (abajo)


