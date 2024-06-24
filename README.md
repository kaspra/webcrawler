# Web Crawler and SEO Report Generator

This project is a Node.js-based web crawler that scans an entire website, collects hit data, and generates SEO reports in both CSV and XLSX formats.

## Features

- Crawls an entire website starting from a base URL.
- Collects and records hit counts for each URL.
- Generates SEO reports in CSV and XLSX formats.

## Prerequisites

- Node.js (version 20)

## Installation

- Clone the repository:
  ```sh
  git clone https://github.com/kaspra/webcrawler.git
  cd webcrawler
  ```

## Usage

- Run the web crawler: ( replace google.com with your own url )

  ```sh
  npm start https://google.com
  ```

- This will generate SEO reports in both CSV and XLSX formats in the reports directory.
