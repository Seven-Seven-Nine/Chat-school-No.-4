<?php

/**
 * Класс для получения данных из html файлов в директории html.
 */
class GetHtml {
    private string $path;
    private string $dataFile;

    public function __construct(string $path) {
        $this->path = $path;
        $this->inti();
    }

    private function inti(): void {
        $this->readHtmlFile();
        $this->echo_200();
    }

    private function readHtmlFile(): void {
        $this->dataFile = file_get_contents('../public/html/' . $this->path);
    }

    private function echo_200(): void {
        http_response_code(200);
        $json_data = [
            'htmlData' => $this->dataFile,
        ];
        echo json_encode($json_data);
    }
}