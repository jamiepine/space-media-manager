import { Injectable } from '@angular/core';

const fs = require("fs");

@Injectable()
export class IndexerService {

  constructor() { }


  	// accept directory url as input
  	// itterate through the directory and write results to a db
  	// return progress 


  public indexDirectory() {

    console.log("Searching...")

    // var path = document.getElementById("selectFile").files[0].path;
    // var name = document.getElementById("selectFile").files[0].name;
    // var count = document.getElementById("selectFile").files.length;
    var path = "/Users/jamiepine/Movies/SpaceDummyImages";

    fs.readdir(path, (err, files) => {

        'use strict';

        if (err) throw  err;

        for (let file of files) {

            console.log(path + "/" + file)
        }
    });




  }


// end of class 
}
