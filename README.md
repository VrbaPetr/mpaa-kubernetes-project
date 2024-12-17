## MPAA Kubernetes Project

![image](https://img.shields.io/badge/Kubernetes-3069DE?style=for-the-badge&logo=kubernetes&logoColor=white)
![image](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![image](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![image](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![image](https://img.shields.io/badge/Elastic_Search-005571?style=for-the-badge&logo=elasticsearch&logoColor=white)
![image](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

**Autoři**
- Petr Vrba Bc.
- Martin Novák Bc.
- Matěj Vachuta Bc.

## Popis projektu
Studijní projekt s cílem vyzkoušet si prakticky aplikaci různých technologií. Základem je Kubernetes a Docker, které realizují provoz jednotlivých služeb. Služby jsou jmenovitě relační databáze, webová API, Elastic Search a Kibana.

- **Databázová služba**: obsahuje testovací data, která zpřístupňuje API službě Elastic Search, která na ní vykonává různé vyhledávací operace.
- **API**: jednoduchá webová API realizovaná na Node.js s Express.js jako REST API. Úkolem služby je umožňovat komunikaci mezi databázovou službou a Elastic Search.
- **Elastic Search**: moderní fulltextový vyhledávač, který má v projektu význam vyhledávání v datech.
- **Kibana**: grafické rozhraní pro přístup k Elastic Stack.

## Verze
Aktuální verze **0.7.** pro prvotní testování.

## Struktura Projektu
- **k8s** -> obsahuje Kubernetes manifesty
- **services** -> obsahuje podsložky s jednotlivými servisy
  - **api**
  - **database**
  - **kibana**  
- **docker-compose.yaml** -> pro lokální testování kontejnerů
- **README.md** -> projekt bez readmíčka je jen špatnej joke :D

## Testování a spouštění projektu lokálně
Stažení projektu
```
git clone -b main https://github.com/VrbaPetr/mpaa-kubernetes-project
```
**Instalace potřebných závislostí**
```
cd services/api
npm install express pg dotenv
npm install @elastic/elasticsearch    
```
**Poznámka**: V rámci projektu jsou (i když je to netradiční) veškeré závislosti již instalovány v services/api/node_modules

Spuštění kontejnerů v lokálním prostředí 
```
docker-compose up -d
```

Kontrola zdali jsou kontejnery aktivní
```
docker ps
```

## Aktualizace závislostí
Při aktualizaci závislostí může být problém objemu souborů, které se automaticky instalují. Může vznikat HTTP 400 response, kód níže komplikaci vyřeší
```
git config http.postBuffer 524288000
```

## Indexace dat v Elastic Search
Jako první je potřeba vytvořit index, do kterého se budou mapovat záznamy pro vyhledávání
```
PUT /airports
{
  "mappings": {
    "properties": {
      "name": { "type": "text" },
      "city": { "type": "text" },
      "country": { "type": "text" },
      "iata_code": { "type": "keyword" },
      "icao_code": { "type": "keyword" },
      "latitude": { "type": "float" },
      "longitude": { "type": "float" },
      "altitude": { "type": "integer" },
      "dst": { "type": "text" },
      "tz_database_time_zone": { "type": "text" },
      "type": { "type": "text" },
      "source": { "type": "text" }
    }
  }
}
```

Pro synchronizaci dat s databází je potřeba odeslat POST request na API Endpoint

```
http://localhost:3000/elastic-index
```