import assert from 'assert'
import { pour, free as freeBarmen } from '../src/barmen'
import { drink, sober, goToBar, getMyCar, getTotallyDrunked, isDrunked, getWhisky } from '../src/me'
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
                var whisky = getWhisky(50);

                var volumeInGlass = pour(whisky, iAskVolume);
                drink(volumeInGlass);

                assert.equal(iAskVolume, volumeInGlass);
                 done();
        });
    });

    suite('i ask -10 grams', function () {
        test('I get an answer that volume is invalid', function (done) {

                var iAskVolume = -10;
                var whisky = getWhisky(-10);


                expect(() => pour(whisky, iAskVolume)).to.throw(/Invalid volume of whisky/);
                done();
            });
        });

    suite('i ask more than 200 grams', function() {
        test('Barmen said there is no such glass', function(done) {
                var iAskVolume = 500;
                var whisky = 1;

                expect(() => pour(whisky, iAskVolume)).to.throw(/There is no such glass/);
                done();
        })
    });

    teardown(function() {
    })
});