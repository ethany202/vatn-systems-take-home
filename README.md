# Vatn Systems Dashboard

## Overview

This codebase contains the frontend code for Vatn Systems's Full-Stack Intern take-home project. Written with React and TypeScript, this application allows users to upload CSV files and view time-based data in the form of line graphs.

## Run Locally

To run this application locally, simply clone the repository and navigate to the `vatn-systems-dashboard` subdirectory. Then, run the following command:

```npm run dev```

Each of the features for this application are accessible under two different routes:
 - `/upload` : Route to upload files
 - `/plots` : Route to view all plot-related data

## Core Features

### Upload CSV Files

Below illustrates the page upon navigating to the `/upload` path. As its name suggests, it represents the page of the application where users may upload CSV files. 

!(alt-text)[readme-screenshots/upload-page.png]

Upon uploading any CSV file, a preview of the first three rows of content will be displayed.
