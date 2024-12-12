## MPAA Kubernetes Project

![image](https://img.shields.io/badge/Kubernetes-3069DE?style=for-the-badge&logo=kubernetes&logoColor=white)
![image](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![image](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![image](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![image](https://img.shields.io/badge/Elastic_Search-005571?style=for-the-badge&logo=elasticsearch&logoColor=white)
![image](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![image](https://img.shields.io/badge/redis-CC0000.svg?&style=for-the-badge&logo=redis&logoColor=white)

**Autoři**
- Petr Vrba Bc.
- Martin Novák Bc.
- Matěj Vachuta Bc.

## Popis projektu
Studijní projekt s cílem vyzkoušet si prakticky aplikaci různých technologií. Základem je Kubernetes a Docker, které realizují provoz jednotlivých služeb. Služby jsou jmenovitě relační databáze, webová API, Elastic Search a Redis.

- **Databázová služba**: obsahuje testovací data, která zpřístupňuje API službě Elastic Search, která na ní vykonává různé vyhledávací operace.
- **API**: jednoduchá webová API realizovaná na Node.js s Express.js jako REST API. Úkolem služby je umožňovat komunikaci mezi databázovou službou a Elastic Search.
- **Elastic Search**: moderní fulltextový vyhledávač, který má v projektu význam vyhledávání v datech.
- **Redis**: pro rozšíření projektu blíže k praktickému užití jsou endpointy cachované pomocí služby Redis.

## Verze
Aktuální verze **0.7.** pro prvotní testování.
