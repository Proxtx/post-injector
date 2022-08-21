export class ImageInput {
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
      this.output.src = URL.createObjectURL(this.file);
    } catch {
      this.output.src = "../lib/notSet.png";
    }
  }
}
