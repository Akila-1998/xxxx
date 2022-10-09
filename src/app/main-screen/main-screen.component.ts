import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from "../services/api/api.service";

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent{

  data: any
  diabeticData: any
  isDiabeticPatient: boolean = false
  isSubmit: boolean = false

  patientForm = new FormGroup({
    pId : new FormControl('', [Validators.required]),
    pName : new FormControl('', [Validators.required]),
    bloodPressure : new FormControl('', [Validators.required]),
    glucose : new FormControl('', [Validators.required]),
    pregnancies : new FormControl('', [Validators.required]),
    skinThickness : new FormControl('', [Validators.required]),
    insulinLevel : new FormControl('', [Validators.required]),
    diabetic : new FormControl('', [Validators.required]),
    age : new FormControl('', [Validators.required]),
  })

  bmiForm = new FormGroup({
    height : new FormControl('', [Validators.required]),
    weight : new FormControl('', [Validators.required]),
  })

  constructor(private apiService: ApiService) {}

  get patientId(){
    return this.patientForm.get('pId');
  }

  get patientName(){
    return this.patientForm.get('pName');
  }

  get bloodPressure(){
    return this.patientForm.get('bloodPressure');
  }

  get glucose(){
    return this.patientForm.get('glucose');
  }

  get pregnancies(){
    return this.patientForm.get('pregnancies');
  }

  get skinThickness(){
    return this.patientForm.get('skinThickness');
  }

  get insulinLevel(){
    return this.patientForm.get('insulinLevel');
  }

  get diabetic(){
    return this.patientForm.get('diabetic');
  }

  get age(){
    return this.patientForm.get('age');
  }

  get height(){
    return this.bmiForm.get('height');
  }

  get weight(){
    return this.bmiForm.get('weight');
  }

  calculate() {
    let formData = {
      height: this.bmiForm.value.height?.trim(),
      weight: this.bmiForm.value.weight?.trim(),
    }
    if(!isNaN(Number(formData.height)) && !isNaN(Number(formData.weight))){
      this.apiService.calculate(formData).subscribe(
        responce => {
          if (responce.bmi != null ) {
            this.data = responce.bmi.toFixed(2)
          }
        },
        error => {
          alert("Something went wrong");
        }
      );
    }else if(isNaN(Number(formData.height))){
      alert("Height is invalid!. Please try again")
    }else if(isNaN(Number(formData.weight))){
      alert("Weight is invalid!. Please try again")
    }

  }

  onSubmit() {
    let formData = {
      patient_id: this.patientForm.value.pId?.trim(),
      patient_name: this.patientForm.value.pName?.trim(),
      bloodpressure: this.patientForm.value.bloodPressure?.trim(),
      glucose: this.patientForm.value.glucose?.trim(),
      pregnancies: this.patientForm.value.pregnancies?.trim(),
      skinthickness: this.patientForm.value.skinThickness?.trim(),
      insulin: this.patientForm.value.insulinLevel?.trim(),
      diabetespedigreefunction: this.patientForm.value.diabetic?.trim(),
      age: this.patientForm.value.age?.trim(),
      bmi: this.data
    }

    if (this.isValidFormData(formData)){
      this.apiService.submit(formData).subscribe(
        response => {
          this.isSubmit = true
          this.diabeticData = response
          if (response.message == "Diabetic") {
            this.isDiabeticPatient = true
          }
        },
        error => {
          alert("Something went wrong");
        }
      );
    }
  }

  isValidFormData(formData: {patient_id: string | undefined, patient_name: string | undefined, bloodpressure: string | undefined, glucose: string | undefined, pregnancies: string | undefined, skinthickness: string | undefined, insulin: string | undefined, diabetespedigreefunction: string | undefined, age: string | undefined, bmi: any}) : boolean{
    if (formData.patient_id != "" && !isNaN(Number(formData.bloodpressure)) && !isNaN(Number(formData.glucose)) && !isNaN(Number(formData.pregnancies)) && !isNaN(Number(formData.skinthickness)) && !isNaN(Number(formData.insulin)) && !isNaN(Number(formData.diabetespedigreefunction)) && !isNaN(Number(formData.age)) && !isNaN(Number(formData.bmi))){
      return true;
    }else if (isNaN(Number(formData.bloodpressure))){
      alert("Blood Pressure is invalid!. Please try again")
      return false;
    }else if (isNaN(Number(formData.glucose))){
      alert("Glucose count is invalid!. Please try again")
      return false;
    }else if (isNaN(Number(formData.pregnancies))){
      alert("Pregnancies count is invalid!. Please try again")
      return false;
    }else if (isNaN(Number(formData.skinthickness))){
      alert("Skin Thickness is invalid!. Please try again")
      return false;
    }else if (isNaN(Number(formData.insulin))){
      alert("Insulin count is invalid!. Please try again")
      return false;
    }else if (isNaN(Number(formData.diabetespedigreefunction))){
      alert("Diabetes Pedigree Function is invalid!. Please try again")
      return false;
    }else if (isNaN(Number(formData.age))){
      alert("Age is invalid!. Please try again")
      return false;
    }else{
      return false;
    }
  }

  reset() {
    this.patientForm.reset()
    this.bmiForm.reset()
    this.data = ''
    this.diabeticData = ''
    this.isSubmit = false
  }
}
