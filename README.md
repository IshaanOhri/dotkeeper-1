<p align="center">
 <img height="80" src = "/assets/head-logo.png">
</p>

<p align="center">DotKeeper is a cloud service for storing, managing and accessing application secrets and configuration files which are sensitive to be checked into Git.
</p>

## What DotKeeper aims to solve?
As a developer we all have faced the issue of managing and storing environment/configuration variables used in our applications. Since the nature of this data is too sensitive it is not advised to check-in this data into Git. This often creates problems like
* unnecessary sharing of these files b/w developers.
* difficult to recover, in case these files sre accidently deleted.
* loose sharing of such sensitive data often results in mishandling which can be cause of a major attack on the system.

<br>

DotKeeper, a simple and powerful cloud service, saves you from the inconvenience of managing these config files yourself. It's Modern, smart and extensible cloud locker for managing secrets and protecting sensitive application data. <br>

<p align="center">
 <img src = "/assets/features.png">
</p>

Packed with amazing features, it ensures 3X more productivity in your dev workflows.

## Challenges we ran into
The main focus behind this project was to increase developers productivity. In order to achieve this, we wanted DotKeeper to be simple and responsive to use. Retaining project original idea and simplicity challenged us in rethinking about
* building a simple and secure enough colloboration/access system.
* easy addition and retrieval of "secrets".
* grouping/versioning secrets according to application stages.

## How we plan to take this project to the Moon!!
Though this project is born as a hack, but our team intend to use it in full capacity for our future development and projects. To make it more accessible and integrateable(so that developers can suit it according to their taste) we have planned to build and release following features in future.
* Rich set of extension and CLI toolings helps easy integration of DotKeeper with your IDE and CI pipeline
* Create and group your secrets mirroring different stages of your application pipeline like dev, stag, prod etc.


