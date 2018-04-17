import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const fs = require("fs");

@Component({
  selector: 'media',
  styleUrls: [ './media.component.css' ],
  templateUrl: './media.component.html'
})
export class MediaComponent implements OnInit {

  public localState: any;
  constructor(
    public route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });

    console.log('hello `Media` component');
    // static data that is bundled
    // var mockData = require('assets/mock-data/mock-data.json');
    // console.log('mockData', mockData);
    // if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')
    this.asyncDataWithWebpack();
  }
  private asyncDataWithWebpack() {
    // you can also async load mock data with 'es6-promise-loader'
    // you would do this if you don't want the mock-data bundled
    // remember that 'es6-promise-loader' is a promise
    setTimeout(() => {

      System.import('../../assets/mock-data/mock-data.json')
        .then((json) => {
          console.log('async mockData', json);
          this.localState = json;
        });

    });
  }

  public selectFile() {
    document.getElementById('selectFile').click()
  }

  public directoryLoaded() {
    var path = document.getElementById("selectFile").files[0].path;
    console.log('LOADED')
    document.getElementById('display-files').innerHTML += `
            <div>Selected Directory: ${path}</div>
    `;
  }

  public listDir() {
    // FILESYSTEM
    console.log("Searching...")
    // var path = document.getElementById("selectFile").files[0].path;
    // var name = document.getElementById("selectFile").files[0].name;
    // var count = document.getElementById("selectFile").files.length;
    var path = "/Users/jamiepine/Movies/SpaceDummyImages";

    fs.readdir(path, (err, files) => {
        'use strict';
        if (err) throw  err;
        console.log("Found ${count} files")
        //the files parameter is an array of the files and folders in the path we passed. So we loop through the array, printing each file and folder
        for (let file of files) {
            //the += after innerHTML means we are appending to the existing content
            var absoluteFileLink = path + "/" + file

            var stats = fs.statSync(absoluteFileLink)

            var fileSizeInBytes = stats.size
            var fileSizeInMegabytes = fileSizeInBytes / 1000000.0

            var fileSizeInBytes = stats.size

            var type = stats.ctime

            document.getElementById('display-files').innerHTML += `
            <div class="image_thumb"><img height="80px" src="${absoluteFileLink}"></div>
            `;
            console.log("TYPE: " + type + " SIZE: " + fileSizeInMegabytes + " PATH:" + absoluteFileLink)
        }
    });

  }

}
