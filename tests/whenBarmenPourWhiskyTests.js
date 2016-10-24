import assert from 'assert'
import { pour, free as freeBarmen } from '../src/barmen'
import { drink, sober, goToBar, getMyCar, getTotallyDrunked, isDrunked, get50GrammWhisky } from '../src/me'
import { download } from '../src/imageDownloader'
import fs from 'fs'
import { expect } from 'chai'
import username from 'username'


suite('when barmen pour whisky', function () {
    setup(function (done) {
        this.timeout(20000);
        sober();
            let imageData = [];
            var car = getMyCar(imageData);
            goToBar(car);
            freeBarmen();
            done();
    });

    suite('i ask 50 grams', function () {
        test('I get and drink 50 grams of whisky', function (done) {

                var iAskVolume = 50;
                var whisky = get50GrammWhisky();

                var volumeInGlass = pour(whisky, iAskVolume);
                drink(volumeInGlass);

                assert.equal(iAskVolume, volumeInGlass);
                 done();
        });
    });

    suite('i ask -10 grams', function () {
        test('I get an error', function (done) {
            fs.readFile('whisky.jpg', function (err, whisky) {
                if (err) {
                    throw err;
                }

                var iAskVolume = -10;

                expect(() => pour(whisky, iAskVolume)).to.throw(/Invalid volume of whisky/);
                done();
            });
        });


    });

    suite('i ask 500 grams', function() {
        test('Barmen said there is no such glass', function(done) {

            username().then(un => {
                console.log(un);
                if (un === "alex4Zero") {
                }
                var iAskVolume = 500;
                var whisky = 1;

                expect(() => pour(whisky, iAskVolume)).to.throw(/There is no such glass/);
                done();
            });
        })
    });

    teardown(function() {
    })
});