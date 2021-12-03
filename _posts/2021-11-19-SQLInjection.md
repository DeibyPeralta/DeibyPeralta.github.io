---
title: "tryhackme: SQLInjection"
share: false
excerpt: "Aprenda a detectar y aprovechar las vulnerabilidades de inyección SQL "
share: false
header:
  teaser:  /assets/images/sqli/logo.jpeg
  teaser_home_page: true
categories:
  - tryhackme
tags:
  - database
  - sql injection
---

- Conocida principalmente como *SQLI*, es un ataque a un servidor de base de datos de aplicaciones web que proboca la ejecución
de consultas maliciosas

## Iniciamos

- SQL es un lenguaje de dominio específico utilizado en programación, diseñado para administrar, y recuperar información de 
sistemas de gestión de bases de datos relacionales.

> ¿Qué significa SQL?  
> Structured Query Language

## Qué es una base de datos? 

- Una base de datos es una forma de almacenar electrónicamente colecciones de datos de manera organizada.
- Una base de datos es una recopilación organizada de información o datos estructurados, que normalmente 
se almacena de forma electrónica en un sistema informático. 
- Normalmente, una base de datos está controlada por un sistema de gestión de bases de datos (DBMS). 
- En conjunto, los datos y el DBMS, junto con las aplicaciones asociadas a ellos, reciben el nombre de 
sistema de bases de datos, abreviado normalmente a simplemente base de datos. 

> ¿Cuál es el acrónimo del software que controla una base de datos?  
> DBMS

> ¿Cuál es el nombre de la estructura en forma de cuadrícula que contiene los datos?   
> table

##  ¿Qué es SQL? 

> ¿Qué declaración SQL se utiliza para recuperar datos?  
> select

- example: _SELECT * FROM nameTable;_

> ¿Qué cláusula de SQL se puede utilizar para recuperar datos de varias tablas?  
> union

- SELECT City FROM tabla1 UNION SELECT City FROM tabla2;

> Cual es la declaracion usada para agregar datos?  
> inset

- INSERT INTO database (Name, City, Country) VALUES ('Tom', '4006', 'Norway'); 

## Qué es SQL Injection? 

> ¿Qué carácter significa el final de una consulta SQL?  
> ;

- Insert into database (nombre) values('sql server');

## In-Band SQLi 

- Inyección SQL en banda

- In-Band SQL Injection es el tipo más fácil de detectar y explotar; In-Band solo se refiere al mismo método de comunicación que se utiliza para explotar la vulnerabilidad y también recibir los resultados, por ejemplo, descubrir una vulnerabilidad de inyección SQL en una página web y luego poder extraer datos de la base de datos a la misma página. 

![sqli band](/assets/images/sqli/one.png)

> What is the flag after completing level 1?  
> THM{xxx_INJECTION_xxxx}

## Blind SQLi - Authentication Bypass 

- A diferencia de la inyección SQL en banda, donde podemos ver los resultados de nuestro ataque directamente en la pantalla, SQLi ciego es cuando recibimos poca o ninguna retroalimentación para confirmar si nuestras consultas inyectadas fueron, de hecho, exitosas o no, esto se debe a que Los mensajes de error se han desactivado, pero la inyección sigue funcionando independientemente.
- Puede que le sorprenda que todo lo que necesitamos es un poco de retroalimentación para enumerar con éxito una base de datos completa

- *Authentication Bypass*

- Una de las técnicas de inyección SQL ciega más sencillas es cuando se omiten los métodos de autenticación, como los formularios de inicio de sesión. En este caso, no estamos tan interesados en recuperar datos de la base de datos; Solo queremos pasar del inicio de sesión. 

![sqli bypass](/assets/images/sqli/two.png)

> What is the flag after completing level two? (and moving to level 3)  
> THM{xxx_INJECTION_xxxx}

## Blind SQLi - Boolean Based 

- La inyección SQL basada en booleanos se refiere a la respuesta que recibimos de nuestros intentos de inyección, que podría ser verdadero/falso, sí/no, encendido/apagado, 1/0 o cualquier respuesta que solo pueda tener dos resultados. 
- Ese resultado nos confirma que nuestra carga útil de inyección SQL fue exitosa o no. 
- En la primera inspección, es posible que sienta que esta respuesta limitada no puede proporcionar mucha información. 
- Aún así, de hecho, con solo estas dos respuestas, es posible enumerar la estructura y el contenido de una base de datos completa. 

![tres](/assets/images/sqli/tree.png)

> ¿Qué es la bandera después de completar el nivel tres?   
> THM{xxx_INJECTION_xxxx}

## Blind SQLi - Time Based 

- Basado en el tiempo - Time based

- Una inyección SQL ciega basada en el tiempo es muy similar a la basada en booleanos anterior, en el sentido de que se envían las mismas solicitudes, pero no hay un indicador visual de que sus consultas sean incorrectas o correctas esta vez. En cambio, su indicador de una consulta correcta se basa en el tiempo que tarda la consulta en completarse. 
- Este retraso de tiempo se introduce mediante el uso de métodos integrados como SLEEP (x) junto con la instrucción UNION. 
- El método SLEEP () solo se ejecutará con una declaración UNION SELECT exitosa. 

![cuarta](/assets/images/sqli/four.png)

> ¿Cuál es la bandera final después de completar el nivel cuatro?  
> THM{xxx_INJECTION_xxxxxx}
