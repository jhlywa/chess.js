#!/bin/bash

cd 300

montage -mode concatenate -background none -tile x1 bp.png bn.png bb.png br.png bq.png bk.png wp.png wn.png wb.png wr.png wq.png wk.png pieces_master.png

cp pieces_master.png ..
cd ..

for i in $(seq 10 2 64); do
    let size=$((i * 12))
    convert -filter blackman -resize "$size x $i" pieces_master.png pieces_$i.png
done

rm def*
rm -rf 1*
rm -rf 2*
rm -rf 3*
rm -rf 4*
rm -rf 5*
rm -rf 6*
rm -rf 7*
rm -rf 8*
rm -rf 9*
