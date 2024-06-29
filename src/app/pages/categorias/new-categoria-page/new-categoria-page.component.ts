import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CategoryService } from '../../../services/category.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../interfaces/category.interface';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-categoria-page.component.html',
  styles: ``,
})
export class NewCategoriaPageComponent implements OnInit {
  public categoryForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  get currentCategory(): Category {
    const category = this.categoryForm.value as Category;
    return category;
  }

  ngOnInit(): void {
    if (this.router.url.includes('edit')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.categoryService.findById(id)))
        .subscribe((category) => {
          if (!category) {
            this.router.navigate(['/categories']);
            return;
          }
          this.categoryForm.reset(category);
          return;
        });
    }
  }

  onSubmit() {
    if (this.categoryForm.invalid) return;
    if (!this.currentCategory.id) {
      this.categoryService.save(this.currentCategory).subscribe((category) => {
        alert(`Categoría ${category.name} creada exitosamente`);
        this.router.navigate(['/categories']);
      });
      return;
    }
    this.categoryService.update(this.currentCategory).subscribe((category) => {
      alert(`Categoría ${category.name} actualizada exitosamente`);
      this.router.navigate(['/categories']);
    });
    return;
  }
}
