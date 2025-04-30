import { gsap } from "gsap";

export class ItemForm {
  constructor(db) {
    console.log("ItemForm initialized");

    this.supabase = db;

    this.html = {};
    this.itemData = {};
    this.locationExists;

    this.existingLocations = [];

    this.init();
  }

  init = () => {
    this.cacheDOM();
    this.getExistingLocations();
    this.initNewLocationCheckbox();
    this.updateForm();
    this.initSubmit();
  };

  cacheDOM = () => {
    this.html.main = document.querySelector("#itemForm");
    this.html.photo = this.html.main.querySelector("#formPhoto");
    this.html.title = this.html.main.querySelector("#formTitle");
    this.html.newLocationCheckbox = this.html.main.querySelector(
      "#formNewLocationCheckbox"
    );
    this.html.location = this.html.main.querySelector("#formLocation");
    this.html.locationOption = this.html.location.querySelector(
      ".formLocationOption"
    );
    this.html.country = this.html.main.querySelector("#formCountry");
    this.html.city = this.html.main.querySelector("#formCity");
    this.html.addLocationBtn = this.html.main.querySelector("#formAddLocation");
    this.html.date = this.html.main.querySelector("#formDate");
    this.html.submitBtn = this.html.main.querySelector("#formSubmit");
  };

  getExistingLocations = async () => {
    const { data, error } = await this.supabase.from("locations").select();
    if (data) {
      this.existingLocations = data;
      this.createExistingLocations();
    } else if (error) {
      console.log(error);
    }
  };

  createExistingLocations = () => {
    this.existingLocations.forEach((loc) => {
      const locationOptionClone = this.html.locationOption.cloneNode(true);
      locationOptionClone.value = loc.id;
      locationOptionClone.innerText = `${loc.city}, ${loc.country}`;
      this.html.location.appendChild(locationOptionClone);
    });
  };

  initNewLocationCheckbox = () => {
    this.locationExists = this.html.newLocationCheckbox.checked;
    this.html.newLocationCheckbox.addEventListener(
      "click",
      this.toggleNewLocation
    );
  };

  toggleNewLocation = () => {
    this.locationExists = this.html.newLocationCheckbox.checked;
    this.updateForm();
  };

  updateForm = () => {
    if (this.locationExists) {
      this.html.country.disabled = true;
      this.html.city.disabled = true;
      this.html.location.disabled = false;
    } else {
      this.html.country.disabled = false;
      this.html.city.disabled = false;
      this.html.location.disabled = true;
    }
  };

  initSubmit = () => {
    this.html.main.addEventListener("submit", this.submitForm);
  };

  submitForm = (event) => {
    event.preventDefault();

    this.collectFormValues();
    this.generateRandomPosition();
    this.uploadImage();
    console.log(
      "Ready to create a new item in DB using the following datas",
      this.itemData
    );
    this.createNewItem();
  };

  collectFormValues = () => {
    this.collectImage();
    this.collectTexts();
  };

  collectImage = () => {
    this.itemData.image = this.html.photo.files[0];
    const sanitizedName = this.itemData.image.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9_.-]/g, "_");

    this.itemData.imagePathInDB = `museum/${Date.now()}_${
      sanitizedName
    }`;
  };

  collectTexts = () => {
    this.itemData.title = this.html.title.value;
    this.itemData.location = this.html.location.value;
    console.log(this.itemData.location);
    this.itemData.date = this.html.date.value;
  };

  generateRandomPosition = () => {
    this.itemData.positionX = gsap.utils.random(-100, 100);
    this.itemData.positionY = gsap.utils.random(-100, 100);
  };

  uploadImage = async () => {
    const { data, error } = await this.supabase.storage
      .from("images")
      .upload(this.itemData.imagePathInDB, this.itemData.image);
    
      if (data) {
        this.getImagePath()
    } else {
      console.log(error);
    }
  };

  getImagePath = async () => {
    const { data } = await this.supabase.storage.from('images').getPublicUrl(this.itemData.imagePathInDB);
    if(data){
        this.itemData.imagePath = data.publicUrl
        this.createNewItem()
    }
  }

  createNewItem = async () => {
    const { error } = await this.supabase.from("items").insert({
      title: this.itemData.title,
      date: this.itemData.date,
      location_id: this.itemData.location,
      image_path: this.itemData.imagePath,
      position_x: this.itemData.positionX,
      position_y: this.itemData.positionY,
    });
    if (error) {
      console.log(error);
    } else {
      console.log("Item created successfully!");
    }
  };
}
