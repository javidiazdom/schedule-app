import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import { HttpService } from '../../http-service.service';
import { ProfileData } from '../../models/ProfileData';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private httpService: HttpService) {
    httpService.getProfileData().subscribe(
      (profile: ProfileData) => {
        this.currentProfile = profile;
        this.userName.setValue(profile.username);
        this.name.setValue(profile.name);
        this.birthDate.setValue(profile.birthDate);
      }
    )
  }

  currentProfile: ProfileData;

  userName =  new FormControl('');
  name =  new FormControl('');
  birthDate =  new FormControl('');



  sendForm() {
    const newUser: ProfileData = {
      username: this.userName.value,
      name: this.name.value,
      birthDate: this.birthDate.value
    }
    this.httpService.updateProfile(newUser).subscribe((response) => {
        window.location.replace("/boards");
    });
  }

  ngOnInit(): void {
  }

}
