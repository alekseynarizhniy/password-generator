import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MainService } from './main.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, ReactiveFormsModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  resultPassword = signal('');
  form = new FormGroup({
    lengthPassword: new FormControl('8', {
      validators: [Validators.min(8), Validators.max(16)]
    }),
    numbers: new FormControl(false),
    specialChars: new FormControl(false),
  });
  mainService = inject(MainService)

  onSubmit(){
    if(this.form.invalid) {
      console.log('Invalid data')
      return;
    }

    const { lengthPassword, numbers, specialChars } = this.form.value;

    this.mainService.getPassword({
      lengthPassword: Number(lengthPassword ?? 8),
      numbers: Boolean(numbers),
      specialChars: Boolean(specialChars)
    }).then((result) => {
      console.log(result);
      this.resultPassword.set(result as string);
    });
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch(err => {
      alert('Failed to copy!');
    });
  }
}
