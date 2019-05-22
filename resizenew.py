
from PIL import Image, ExifTags
import math
import functools
from pathlib import Path, PurePath 
from pprint import pprint
from collections import defaultdict


EXIF_KEYS = [
        'DateTimeOriginal',
        'Model',
        'ISOSpeedRatings',
        'MaxApertureValue',
        'GPSInfo',
        'FocalLengthIn35mmFilm',
        'MeteringMode',
        'FNumber',
        'ExposureTime',
        'Copyright']

# From stackoverflow.com
def image_transpose_exif(im):
    """
        Apply Image.transpose to ensure 0th row of pixels is at the visual
        top of the image, and 0th column is the visual left-hand side.
        Return the original image if unable to determine the orientation.

        As per CIPA DC-008-2012, the orientation field contains an integer,
        1 through 8. Other values are reserved.
    """

    exif_orientation_tag = 0x0112
    exif_transpose_sequences = [                   # Val  0th row  0th col
        [],                                        #  0    (reserved)
        [],                                        #  1   top      left
        [Image.FLIP_LEFT_RIGHT],                   #  2   top      right
        [Image.ROTATE_180],                        #  3   bottom   right
        [Image.FLIP_TOP_BOTTOM],                   #  4   bottom   left
        [Image.FLIP_LEFT_RIGHT, Image.ROTATE_90],  #  5   left     top
        [Image.ROTATE_270],                        #  6   right    top
        [Image.FLIP_TOP_BOTTOM, Image.ROTATE_90],  #  7   right    bottom
        [Image.ROTATE_90],                         #  8   left     bottom
    ]

    try:
        seq = exif_transpose_sequences[im._getexif()[exif_orientation_tag]]
    except Exception:
        return im
    else:
        return functools.reduce(type(im).transpose, seq, im)

def resize_contain(image, size, bg_color=(255, 255, 255, 0),resample=Image.LANCZOS):
    """
    Resize image according to size.
    image:      a Pillow image instance
    size:       a list of two integers [width, height]
    """
    img_format = image.format
    img = image.copy()
    img.thumbnail((size[0], size[1]), resample)
    background = Image.new('RGBA', (size[0], size[1]), bg_color)
    img_position = (
        int(math.ceil((size[0] - img.size[0]) / 2)),
        int(math.ceil((size[1] - img.size[1]) / 2))
    )
    background.paste(img, img_position)
    background.format = img_format
    return background.convert('RGB')

# from developer.here.com
def get_decimal_from_dms(dms, ref):
    print('get_decimal()')
    degrees = dms[0][0] / dms[0][1]
    minutes = dms[1][0] / dms[1][1] / 60.0
    seconds = dms[2][0] / dms[2][1] / 3600.0

    if ref in ['S', 'W']:
        degrees = -degrees
        minutes = -minutes
        seconds = -seconds

    return round(degrees + minutes + seconds, 5)

def get_coordinates(geotags):
    print('get_coord()')
    if 'GPSLatitude' in geotags and 'GPSLatitudeRef' in geotags:
        lat = get_decimal_from_dms(geotags['GPSLatitude'], geotags['GPSLatitudeRef'])
    else:
        return('','')
    if 'GPSLongitude' in geotags and 'GPSLongitudeRef' in geotags:
        lon = get_decimal_from_dms(geotags['GPSLongitude'], geotags['GPSLongitudeRef'])
    else:
        return('','')

    return (lat,lon)

def get_gps(exif):
    print('get_gps()')
    if not exif:
        raise ValueError("No EXIF metadata found")
    geotagging = {}
    for(idx, tag) in ExifTags.TAGS.items():
        if tag == 'GPSInfo':
            if idx not in exif:
                raise ValueError("No EXIF geotagging found")
            for(key,val) in ExifTags.GPSTAGS.items():
                if key in exif[idx]:
                    geotagging[val] = exif[idx][key]
    
    return geotagging;

def get_exif(im):
    print('get_exif()')
    exif = im._getexif()
    labeled = dict.fromkeys(EXIF_KEYS,0)
    geotags = {}
    for(key,val) in exif.items():
        newkey = ExifTags.TAGS.get(key)
        if newkey in labeled.keys():
            if newkey == 'GPSInfo':
                geotags = get_gps(exif)
                coords = get_coordinates(geotags)
                labeled[newkey]=coords
            elif newkey == 'Copyright':
                labeled[newkey] = 'Copyright by this website'
            else:
                labeled[newkey]=exif[key]
            print(f'...{newkey} : {labeled[newkey]}')
    return labeled

def main():
    print('main()')
    size = (640,480)
    bg_color = (0,0,0,0)

    cwd = Path().absolute()
    indir = 'input'
    outdir = 'output'

    srcFilePath = cwd / indir
    dstFilePath = cwd / outdir

    if srcFilePath.is_dir():
        files = [PurePath(x).name for x in srcFilePath.iterdir() if x.is_file()]    
    print(files)
    jsonDict = dict.fromkeys(files,0)
    if (dstFilePath.exists() and dstFilePath.is_dir()):
        print(f'{dstFilePath} found!')
        for file in files:
            img = Image.open(srcFilePath/file)
            format = img.format
            jsonDict[file] = get_exif(img)
            img = image_transpose_exif(img)
            new_img = resize_contain(img,size,bg_color)
            newname = str(size[0]) + 'x' + str(size[1]) + '-' + file
            new_img.save(dstFilePath/newname, format)
            
    else:
        print(f'{dstFilePath} NOT found!')
    with open('buh.txt', 'w') as f:
        for key, val in jsonDict.items():
            print(f'{key}:{val}', file=f )
if __name__ == '__main__':
    main()