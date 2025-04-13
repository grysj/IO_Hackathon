FROM gradle:8.5-jdk21-alpine AS build

WORKDIR /home/app
COPY build.gradle settings.gradle ./
COPY gradle ./gradle
RUN gradle build -x test --no-daemon || return 0
COPY . .
RUN gradle bootJar -x test --no-daemon

FROM bellsoft/liberica-openjdk-alpine:21
VOLUME /tmp
COPY --from=build /home/app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
