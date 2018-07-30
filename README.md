# Red Social para Mamis - Mom Center

## Introducción

El crecimiento de la tasa de natalidad en el Perú y con la problemática que genera el sistema de salud en nuestro
país trae consigo que muchas mamis se sientan desprotegidas y opten por buscar información en fuentes no tan 
confiables de internet. Por ello creemos que ellas necesitan acceder a una fuente confiable de información como 
es el caso de nuestra red social que unirá especialistas y mamás.

## Objetivos

Mom Center es una red social que busca conectar a mamis con pediatras para solucionar algunas dudas durante la etapa 
de gestación así como los cuidados del recién nacido.

## Usuarios

Esta red social está enfocada en mamás pues busca la relación más confiable entre pediatras y/o otros especialistas.

## Implementación

Este proyecto se basa en un periodo de 3 sprints, los cuales hemos estructurado y planificado nuestro proyecto de la 
siguiente manera:

### Primer Sprint

Para este primer proyecto la organización está basada en un Product Backlog de *Historias de Usuarios* con lo cuál las 
tareas planificadas son:

![primer-sprint](img/sprint1.jpg)

### 1) Definir Tema, nombre, colores y usuarios

Nos enfocamos en la problemática de nuestro país y empezamos a trabajar en ello. Preparamos una encuesta virtual para 
llegar a más usuarios y conocer lo que desean.

[Encuesta] (https://docs.google.com/forms/d/e/1FAIpQLSeCWPjr1TOdrSDa4-GY00Jt80uofd25uFRGZ7LSpB-eqM743A/viewform)

![Problematica](img/problematica.png)

### 2) Diseñar un sketch a mano

Nos fue más fácil trabajar todo nuestro diseño en una pizarra, como base en una red social sencilla y de pocos pasos 
para nuestros usuarios.

![inicio](img/inicio.jpg)
![buscar](img/buscar.jpg)
![notificacion](img/notificacion.jpg)
![user](img/user.jpg)

### 3) Definir un prototipo de alta fidelidad

Usamos Marvelapp para desarrollar el diseño de alta fidelidad porque muestra de una manera más real como llegar a 
usarlo.

[Marvel](https://marvelapp.com/3a0001f/screen/45389678)

![Marvel](img/marvel.jpg)

### 4) Hacer la conexión con Firebase

Para esto se creó un HTML y un archivo Javascript para poder copiar los códigos de conexión al proyecto y tenga 
la autenticación del login con otras redes sociales como Facebook y Google.

### 5) Modificación de Estilos CSS al diseño

Se modifica y ajusta el HTML para que se muestre conforme lo diseñado en el prototipo de alta fidelidad, con la finalidad de poder testear con usuarios.


### 5) Brenchmark de aplicaciones o redes sociales

Como tarea principal del proyecto fue plasmar las principales redes sociales y hacer un comparativo de lo que cumplen para cada tipo de 
usuario, encontrando funcionalidades espectaculares en unas y un "ésta aplicación sería mejor si pudiera hacer ...".

[Brenchmark](https://docs.google.com/spreadsheets/d/1-umWJZIVBCSEnscqi40Gh_tZ5fD0ggap0Hwk06ND-l8/edit#gid=0)

![Brenchmark](img/brenchmark.jpg)


### Segundo Sprint

Para esta segunda presentación la organización está basada en un Product Backlog de *Historias de Usuarios* con lo cuál las 
tareas planificadas son:

![segundo-sprint](img/sprint2.jpg)


### 1) Modificación de Estilos CSS al diseño

Desde un primer momento iniciamos nuestros estilos en base a CSS y no lograbamos que se aprecie
lo que verdaderamente buscabamos, y por sugerencia de nuestras compañeras decidimos implementar Materialize
a nuestro proyecto, pues es un framework que ya cuenta con estilos de modo responsive.


### 2) Funcionalidad de la red social

La librería que se empleó para el proyecto fue Vanilla Js, pues al conocer más su semántica fue más cómodo trabajar este
poyecto, además que ahorrabamos tiempo. Nuestras ambiciones para este sprint fueron las de poder hacer publicaciones mostrando la
data que almacenaba firebase cada que alguien lo usaba.


### 3) Aplicación de testing a usuarios

Los usuarios a los que se entrevistó, lo hicimos a través de nuestro prototipo en Marvel a través de estas entrevistas se logró manejar mejor 
nuestra red social, recibimos mucho feedback como manejar mejor los colores, logo, o pensar en como vamos a redireccionar algunas vistas.



### Tercer Sprint

Para esta tercera presentación la organización está basada en un Product Backlog de *Historias de Usuarios* con lo cuál las 
tareas planificadas son:

![tercer-sprint](img/sprint3.jpg)


### 1) Aplicación de testing a usuarios

Los usuarios a los que se entrevistó, lo hicimos a través de nuestro proyecto ya desplegado en *Github* a través de estas entrevistas 
recibimos mucho feedback acerca del tiempo de espera para poder loguearse, hasta observamos si habian errores de doble publicación o más 
problemas técnicos como ese.


Recomendaciones a las entrevistas:
** Karen Moreno (18 años)
Cuando se registren e ingresen por primera vez, que haya un texto como de bienvenida o algo así como una pestaña de sugerencias.
Cuando editaba no sabia que el botón de guardar era ese.

** Nancy Urcia (42 años)
Antes de la parte de registro me gustaría saber de que trata la aplicación para poder animarme a ingresar, pude observar que es 
muy parecido a tener una cuenta de facebook. Me agrada.


## Colaboradoras del Proyecto:

* [Heydy Carrasco](https://github.com/HeydyCH/lim-2018-05-bc-core-am-socialnetwork)
* [Fiorella Effio](https://github.com/FiorellaEffio/lim-2018-05-bc-core-am-socialnetwork)
* [Anaey Guillen](https://github.com/AnaeyGuillen/lim-2018-05-bc-core-am-socialnetwork)