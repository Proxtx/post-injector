import { setFromUrl, reset } from "./dataDisplay.js";

export class ContentInput {
  constructor(input, output) {
    this.input = input;
    this.output = output;
  }

  activate() {
    if (!this.input.files || !this.input.files[0]) return;
    this.file = this.input.files[0];
    this.display();
  }

  display() {
    try {
      setFromUrl(this.file);
    } catch (e) {
      reset();
    }
  }

  async upload() {
    if (!this.file) return;

    let formData = new FormData();
    formData.append("web", this.file);

    await fetch("/upload", {
      method: "POST",
      body: formData,
    });
  }
}
