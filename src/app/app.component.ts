import { Component } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  items = [
    {
      productId: 446,
      artName: "CASUAL",
      shoppifyFlag: false,
      productPrice: 32.0
    },
    {
      productId: 459,
      artName: "test",
      shoppifyFlag: false,
      productPrice: 37.0
    },
    {
      productId: 461,
      artName: "test",
      shoppifyFlag: false,
      productPrice: 54.0
    },
    {
      productId: 465,
      artName: "test2212",
      shoppifyFlag: false,
      productPrice: 88.0
    },
    {
      productId: 469,
      artName: "test444",
      shoppifyFlag: false,
      productPrice: 57.0
    }
  ];
  item =  465;
}
