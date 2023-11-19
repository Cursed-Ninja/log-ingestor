[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/2sZOX9xt)

<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a id="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#project-overview">Project Overview</a>
      <ul>
        <li><a href="#log-ingestor">Log ingestor</a></li>
        <li><a href="#web-ui-for-log-querying">Web UI for Log Querying</a></li>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#architecture">Architecture</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## Project Overview

### Log Ingestor

The Log Ingestor is a robust system designed to efficiently handle and process log data sent to the backend in JSON format. The entire workflow involves the ingestion of logs, transmission through Kafka producers, storage in a Kafka broker, consumption by a Kafka consumer, and ultimately persistence in MongoDB.

#### Workflow

1. **Log Ingestion:**

   - Logs are sent to the backend in JSON format.
   - The backend processes incoming logs for further transmission.

2. **Kafka Producer:**

   - Processed logs are sent to the Kafka producer for efficient handling.
   - Kafka producer facilitates the transfer of log data to the Kafka broker.

3. **Kafka Broker:**

   - The Kafka broker acts as a central hub for log data.
   - Logs are stored temporarily in the Kafka broker before consumption.

4. **Kafka Consumer and MongoDB:**
   - A dedicated consumer consumes logs from the Kafka broker.
   - Consumed logs are stored in MongoDB for persistent storage.

### Web UI for Log Querying

The project also features a user-friendly Web UI for querying logs, providing a seamless experience for users to interact with the log data.

#### Query Frontend

- Users can apply multiple filters for refining log queries.
- Date range filtering allows users to focus on logs within specific time intervals.

#### Presentation of Data

- The queried log data is presented in an organized table format.
- Pagination functionality enhances the efficiency of data loading.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![React][React.js]][React-url]
- [![Node][Nodejs]][Nodejs-url]
- [![MongoDB][MongoDB]][MongoDB-url]
- [![Kafka][Kafka]][Kafka-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Architecture

![Architecture][architecture-image]

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Make sure to install [Docker][docker-url] and [Docker Compose][docker-compose-url] before proceeding.

### Installation

1. Create and get the mongodb connection string from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. Clone the repo

   ```sh
   git clone https://github.com/dyte-submissions/november-2023-hiring-Cursed-Ninja.git
   ```

3. In the `docker-compose.yml` file, replace the enviroment variables for `kafka-microservice` and `backend` with the username, password, cluster name and database name from the connection string

   ```yml
   environment:
     DB_USERNAME: <username>
     DB_PSWD: <password>
     DB_CLUSTER: <cluster-name>
     DB_DATABASE: <database-name>
   ```

4. Run the following command to start the project

   ```sh
   docker-compose up -d zookeeper kafka init-kafka
   ```

5. Check the logs of the `init-kafka` container to see if the topics have been created by running the following command

   ```sh
   docker-compose logs init-kafka
   ```

6. Run the following command to start the remaining containers
   ```sh
   docker-compose up -d backend kafka-microservice frontend
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

- The Web UI for querying can be accessed at `http://localhost:8080/`
- The backend API can be accessed at `http://localhost:3000/`

- To ingest the logs, make **POST** request to the api endpoint `http://localhost:3000/api/log` with the following payload
  ```json
  {
    "level": "error",
    "message": "Failed to connect to DB",
    "resourceId": "server-1234",
    "timestamp": "2023-09-15T08:00:00Z",
    "traceId": "abc-xyz-123",
    "spanId": "span-456",
    "commit": "5e5342f",
    "metadata": {
      "parentResourceId": "server-0987"
    }
  }
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Issues

- The app fails to start if the `init-kafka` fails to create the topic. The container then needs to be restarted manually.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Project Link: [https://github.com/dyte-submissions/november-2023-hiring-Cursed-Ninja](https://github.com/dyte-submissions/november-2023-hiring-Cursed-Ninja)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Nodejs]: https://img.shields.io/badge/Nodejs-20232A?style=for-the-badge&logo=node.js&logoColor=61DAFB
[Nodejs-url]: https://nodejs.org/en/
[MongoDB]: https://img.shields.io/badge/MongoDB-20232A?style=for-the-badge&logo=mongodb&logoColor=61DAFB
[MongoDB-url]: https://www.mongodb.com/
[Kafka]: https://img.shields.io/badge/Kafka-20232A?style=for-the-badge&logo=apache-kafka&logoColor=61DAFB
[Kafka-url]: https://kafka.apache.org/
[docker-url]: https://docs.docker.com/get-docker/
[docker-compose-url]: https://docs.docker.com/compose/install/
[architecture-image]: images/architecture.png
