import { useParams } from "react-router-dom";
import ProductList from "../components/products/ProductList";
import { useNavigate } from "react-router-dom";


const artProducts = [

    {
        "id": 1,
        "name": "Absolute-Black-Granite",
        "image": "/tables/artinfo1.jpg",
        "category": "tables",
        "isNew": true
    },
    {
        "id": 2,
        "name": "Absolute-Black-Granite",
        "image": "/tables/artinfo2.jpg",
        "category": "tables",
        "isNew": true
    },
    {
        "id": 3,
        "name": "Absolute-Black-Granite",
        "image": "/tables/artinfo3.jpg",
        "category": "tables",
        "isNew": true
    },
    {
        "id": 4,
        "name": "Absolute-Black-Granite",
        "image": "/tables/artinfo4.jpg",
        "category": "tables",
        "isNew": true
    },
    {
        "id": 5,
        "name": "Absolute-Black-Granite",
        "image": "/tables/artinfo5.jpg",
        "category": "tables",
        "isNew": true
    },
    {
        "id": 6,
        "name": "Absolute-Black-Granite",
        "image": "/tables/artinfo6.jpg",
        "category": "tables",
        "isNew": true
    },
    {
        "id": 7,
        "name": "Absolute-Black-Granite",
        "image": "/tables/artinfo7.jpg",
        "category": "tables",
        "isNew": true
    },
    {
        "id": 8,
        "name": "Absolute-Black-Granite",
        "image": "/tables/artinfo8.jpg",
        "category": "tables",
        "isNew": true
    },
    {
        "id": 9,
        "name": "Absolute-Black-Granite",
        "image": "/tables/artinfo9.jpg",
        "category": "tables",
        "isNew": true
    },
    {
        "id": 10,
        "name": "Absolute-Black-Granite",
        "image": "/tables/artinfo10.jpg",
        "category": "tables",
        "isNew": true
    },
    {
        "id": 11,
        "name": "Absolute-Black-Granite",
        "image": "/tables/artinfo11.jpg",
        "category": "tables",
        "isNew": true
    },
    {
        "id": 12,
        "name": "Absolute-Black-Granite",
        "image": "/tables/artinfo12.jpg",
        "category": "tables",
        "isNew": true
    },
    {
        "id": 13,
        "name": "Absolute-Black-Granite",
        "image": "/tables/artinfo13.jpg",
        "category": "tables",
        "isNew": true
    },
    {
        "id": 14,
        "name": "Absolute-Black-Granite",
        "image": "/tables/artinfo14.jpg",
        "category": "tables",
        "isNew": true
    },
    {
        "id": 15,
        "name": "Absolute-Black-Granite",
        "image": "/tables/artinfo15.jpg",
        "category": "tables",
        "isNew": true
    },
    {
        "id": 16,
        "name": "Absolute-Black-Granite",
        "image": "/tables/artinfo16.jpg",
        "category": "tables",
        "isNew": true
    },
    {
        "id": 17,
        "name": "Absolute-Black-Granite",
        "image": "/FlowerPots/flowerpot1.jpg",
        "category": "pots",
        "isNew": true
    },
    {
        "id": 18,
        "name": "Absolute-Black-Granite",
        "image": "/FlowerPots/flowerpot2.jpg",
        "category": "pots",
        "isNew": true
    },
    {
        "id": 19,
        "name": "Absolute-Black-Granite",
        "image": "/FlowerPots/flowerpot3.jpg",
        "category": "pots",
        "isNew": true
    },
    {
        "id": 20,
        "name": "Absolute-Black-Granite",
        "image": "/FlowerPots/flowerpot4.jpg",
        "category": "pots",
        "isNew": true
    },
    {
        "id": 21,
        "name": "Absolute-Black-Granite",
        "image": "/FlowerPots/flowerpot5.jpg",
        "category": "pots",
        "isNew": true
    },
    {
        "id": 22,
        "name": "Absolute-Black-Granite",
        "image": "/FlowerPots/flowerpot6.jpg",
        "category": "pots",
        "isNew": true
    },
    {
        "id": 23,
        "name": "Absolute-Black-Granite",
        "image": "/FlowerPots/flowerpot7.jpg",
        "category": "pots",
        "isNew": true
    },
    {
        "id": 24,
        "name": "Absolute-Black-Granite",
        "image": "/FlowerPots/flowerpot8.jpg",
        "category": "pots",
        "isNew": true
    },
    {
        "id": 25,
        "name": "Absolute-Black-Granite",
        "image": "/FlowerPots/flowerpot9.jpg",
        "category": "pots",
        "isNew": true
    },
    {
        "id": 26,
        "name": "Absolute-Black-Granite",
        "image": "/FlowerPots/flowerpot10.jpg",
        "category": "pots",
        "isNew": true
    },
    {
        "id": 27,
        "name": "Absolute-Black-Granite",
        "image": "/FlowerPots/flowerpot11.jpg",
        "category": "pots",
        "isNew": true
    },
    {
        "id": 28,
        "name": "Absolute-Black-Granite",
        "image": "/FlowerPots/flowerpot12.jpg",
        "category": "pots",
        "isNew": true
    },
    {
        "id": 29,
        "name": "Absolute-Black-Granite",
        "image": "/FlowerPots/flowerpot13.jpg",
        "category": "pots",
        "isNew": true
    },
    {
        "id": 30,
        "name": "Absolute-Black-Granite",
        "image": "/gardenbench/art1.jpg",
        "category": "gardenbenches",
        "isNew": true
    },
    {
        "id": 31,
        "name": "Absolute-Black-Granite",
        "image": "/gardenbench/art2.jpg",
        "category": "gardenbenches",
    },
    {
        "id": 32,
        "name": "Absolute-Black-Granite",
        "image": "/gardenbench/art3.jpg",
        "category": "gardenbenches",
    },
    {
        "id": 33,
        "name": "Absolute-Black-Granite",
        "image": "/gardenbench/art4.jpg",
        "category": "gardenbenches",
    },
    {
        "id": 34,
        "name": "Absolute-Black-Granite",
        "image": "/gardenbench/art5.jpg",
        "category": "gardenbenches",
    },
    {
        "id": 35,
        "name": "Absolute-Black-Granite",
        "image": "/gardenbench/art6.jpg",
        "category": "gardenbenches",
    },
    {
        "id": 36,
        "name": "Absolute-Black-Granite",
        "image": "/gardenbench/art7.jpg",
        "category": "gardenbenches",
    },
    {
        "id": 37,
        "name": "Absolute-Black-Granite",
        "image": "/gardenbench/art8.jpg",
        "category": "gardenbenches",
    },
    {
        "id": 38,
        "name": "Absolute-Black-Granite",
        "image": "/gardenbench/art9.jpg",
        "category": "gardenbenches",
    },
    {
        "id": 39,
        "name": "Absolute-Black-Granite",
        "image": "/gardenbench/art10.jpg",
        "category": "gardenbenches",
    },
    {
        "id": 40,
        "name": "Absolute-Black-Granite",
        "image": "/bathtub/bathtub1.jpg",
        "category": "marblebathtub",
    },
    {
        "id": 41,
        "name": "Absolute-Black-Granite",
        "image": "/bathtub/bathtub2.jpg",
        "category": "marblebathtub",
    },
    {
        "id": 42,
        "name": "Absolute-Black-Granite",
        "image": "/bathtub/bathtub3.jpg",
        "category": "marblebathtub",
    },
    {
        "id": 43,
        "name": "Absolute-Black-Granite",
        "image": "/bathtub/bathtub4.jpg",
        "category": "marblebathtub",
    },
    {
        "id": 44,
        "name": "Absolute-Black-Granite",
        "image": "/bathtub/bathtub5.jpg",
        "category": "marblebathtub",
    },
    {
        "id": 45,
        "name": "Absolute-Black-Granite",
        "image": "/bathtub/bathtub6.jpg",
        "category": "marblebathtub",
    },
    {
        "id": 46,
        "name": "Absolute-Black-Granite",
        "image": "/bathtub/bathtub7.jpg",
        "category": "marblebathtub",
    },
    {
        "id": 47,
        "name": "Absolute-Black-Granite",
        "image": "/bathtub/bathtub8.jpg",
        "category": "marblebathtub",

    },
    {
        "id": 48,
        "name": "Absolute-Black-Granite",
        "image": "/bathtub/bathtub9.jpg",
        "category": "marblebathtub",
    },
    {
        "id": 49,
        "name": "Absolute-Black-Granite",
        "image": "/bathtub/bathtub10.jpg",
        "category": "marblebathtub",
    },
    {
        "id": 50,
        "name": "Absolute-Black-Granite",
        "image": "/bathtub/bathtub11.jpg",
        "category": "marblebathtub",
    },
    {
        "id": 51,
        "name": "Absolute-Black-Granite",
        "image": "/bathtub/bathtub12.jpg",
        "category": "marblebathtub",
    },
    {
        "id": 52,
        "name": "Absolute-Black-Granite",
        "image": "/bathtub/bathtub13.jpg",
        "category": "marblebathtub",
    },
    {
        "id": 53,
        "name": "Absolute-Black-Granite-1",
        "image": "/coffetable/coffetable1.jpg",
        "category": "coffeetable"
    },
    {
        "id": 54,
        "name": "Absolute-Black-Granite-2",
        "image": "/coffetable/coffetable2.jpg",
        "category": "coffeetable"
    },
    {
        "id": 55,
        "name": "Absolute-Black-Granite-3",
        "image": "/coffetable/coffetable3.jpg",
        "category": "coffeetable"
    },
    {
        "id": 56,
        "name": "Absolute-Black-Granite-4",
        "image": "/coffetable/coffetable4.jpg",
        "category": "coffeetable"
    },
    {
        "id": 57,
        "name": "Absolute-Black-Granite-5",
        "image": "/coffetable/coffetable5.jpg",
        "category": "coffeetable"
    },
    {
        "id": 58,
        "name": "Absolute-Black-Granite-6",
        "image": "/coffetable/coffetable6.jpg",
        "category": "coffeetable"
    },
    {
        "id": 59,
        "name": "Absolute-Black-Granite-7",
        "image": "/coffetable/coffetable7.jpg",
        "category": "coffeetable"
    },
    {
        "id": 60,
        "name": "Absolute-Black-Granite-8",
        "image": "/coffetable/coffetable8.jpg",
        "category": "coffeetable"
    },
    {
        "id": 61,
        "name": "Absolute-Black-Granite-9",
        "image": "/coffetable/coffetable9.jpg",
        "category": "coffeetable"
    },
    {
        "id": 62,
        "name": "Absolute-Black-Granite-10",
        "image": "/coffetable/coffetable10.jpg",
        "category": "coffeetable"
    },
    {
        "id": 63,
        "name": "Absolute-Black-Granite-11",
        "image": "/coffetable/coffetable11.jpg",
        "category": "coffeetable"
    },
    {
        "id": 64,
        "name": "Absolute-Black-Granite-12",
        "image": "/coffetable/coffetable12.jpg",
        "category": "coffeetable"
    },
    {
        "id": 65,
        "name": "Absolute-Black-Granite-13",
        "image": "/coffetable/coffetable13.jpg",
        "category": "coffeetable"
    },
    {
        "id": 66,
        "name": "Absolute-Black-Granite-14",
        "image": "/coffetable/coffetable14.jpg",
        "category": "coffeetable"
    },
    {
        "id": 67,
        "name": "Absolute-Black-Granite-15",
        "image": "/coffetable/coffetable15.jpg",
        "category": "coffeetable"
    },
    {
        "id": 68,
        "name": "Absolute-Black-Granite-16",
        "image": "/coffetable/coffetable16.jpg",
        "category": "coffeetable"
    },
    {
        "id": 69,
        "name": "Absolute-Black-Granite-17",
        "image": "/coffetable/coffetable17.jpg",
        "category": "coffeetable"
    },
    {
        "id": 70,
        "name": "Absolute-Black-Granite-18",
        "image": "/coffetable/coffetable18.jpg",
        "category": "coffeetable"
    },
    {
        "id": 71,
        "name": "Absolute-Black-Granite-19",
        "image": "/coffetable/coffetable19.jpg",
        "category": "coffeetable"
    },
    {
        "id": 72,
        "name": "Absolute-Black-Granite-20",
        "image": "/coffetable/coffetable20.jpg",
        "category": "coffeetable"
    },
    {
        "id": 73,
        "name": "Absolute-Black-Granite-21",
        "image": "/coffetable/coffetable21.jpg",
        "category": "coffeetable"
    },
    {
        "id": 74,
        "name": "Absolute-Black-Granite-22",
        "image": "/coffetable/coffetable22.jpg",
        "category": "coffeetable"
    },
    {
        "id": 75,
        "name": "Absolute-Black-Granite-23",
        "image": "/coffetable/coffetable23.jpg",
        "category": "coffeetable"
    },
    {
        "id": 76,
        "name": "Absolute-Black-Granite-24",
        "image": "/coffetable/coffetable24.jpg",
        "category": "coffeetable"
    },
    {
        "id": 77,
        "name": "Absolute-Black-Granite-25",
        "image": "/coffetable/coffetable25.jpg",
        "category": "coffeetable"
    },
    {
        "id": 78,
        "name": "Absolute-Black-Granite-26",
        "image": "/coffetable/coffetable26.jpg",
        "category": "coffeetable"
    },
    {
        "id": 79,
        "name": "Absolute-Black-Granite-27",
        "image": "/coffetable/coffetable27.jpg",
        "category": "coffeetable"
    },
    {
        "id": 80,
        "name": "Absolute-Black-Granite-28",
        "image": "/coffetable/coffetable28.jpg",
        "category": "coffeetable"
    },
    {
        "id": 81,
        "name": "Absolute-Black-Granite-29",
        "image": "/coffetable/coffetable29.jpg",
        "category": "coffeetable"
    },
    {
        "id": 82,
        "name": "Absolute-Black-Granite-30",
        "image": "/coffetable/coffetable30.jpg",
        "category": "coffeetable"
    },
    {
        "id": 83,
        "name": "Absolute-Black-Granite-31",
        "image": "/coffetable/coffetable31.jpg",
        "category": "coffeetable"
    },
    {
        "id": 84,
        "name": "Absolute-Black-Granite-32",
        "image": "/coffetable/coffetable32.jpg",
        "category": "coffeetable"
    },
    {
        "id": 85,
        "name": "Absolute-Black-Granite-33",
        "image": "/coffetable/coffetable33.jpg",
        "category": "coffeetable"
    },
    {
        "id": 86,
        "name": "Absolute-Black-Granite-34",
        "image": "/coffetable/coffetable34.jpg",
        "category": "coffeetable"
    },
    {
        "id": 87,
        "name": "Absolute-Black-Granite-35",
        "image": "/coffetable/coffetable35.jpg",
        "category": "coffeetable"
    },
    {
        "id": 88,
        "name": "Absolute-Black-Granite-1",
        "image": "/bathroom/bathroomset1.jpg",
        "category": "marblebathroomsets"
    },
    {
        "id": 89,
        "name": "Absolute-Black-Granite-2",
        "image": "/bathroom/bathroomset2.jpg",
        "category": "marblebathroomsets"
    },
    {
        "id": 90,
        "name": "Absolute-Black-Granite-3",
        "image": "/bathroom/bathroomset3.jpg",
        "category": "marblebathroomsets"
    },
    {
        "id": 91,
        "name": "Absolute-Black-Granite-4",
        "image": "/bathroom/bathroomset4.jpg",
        "category": "marblebathroomsets"
    },
    {
        "id": 92,
        "name": "Absolute-Black-Granite-5",
        "image": "/bathroom/bathroomset5.jpg",
        "category": "marblebathroomsets"
    },
    {
        "id": 93,
        "name": "Absolute-Black-Granite-6",
        "image": "/bathroom/bathroomset6.jpg",
        "category": "marblebathroomsets"
    },
    {
        "id": 94,
        "name": "Absolute-Black-Granite-7",
        "image": "/bathroom/bathroomset7.jpg",
        "category": "marblebathroomsets"
    },
    {
        "id": 95,
        "name": "Absolute-Black-Granite-8",
        "image": "/bathroom/bathroomset8.jpg",
        "category": "marblebathroomsets"
    },
    {
        "id": 96,
        "name": "Absolute-Black-Granite-9",
        "image": "/bathroom/bathroomset9.jpg",
        "category": "marblebathroomsets"
    },
    {
        "id": 97,
        "name": "Absolute-Black-Granite-10",
        "image": "/bathroom/bathroomset10.jpg",
        "category": "marblebathroomsets"
    },
    {
        "id": 98,
        "name": "Absolute-Black-Granite-11",
        "image": "/bathroom/bathroomset11.jpg",
        "category": "marblebathroomsets"
    },
    {
        "id": 99,
        "name": "Absolute-Black-Granite-12",
        "image": "/bathroom/bathroomset12.jpg",
        "category": "marblebathroomsets"
    },
    {
        "id": 100,
        "name": "Absolute-Black-Granite-13",
        "image": "/bathroom/bathroomset13.jpg",
        "category": "marblebathroomsets"
    },
    {
        "id": 101,
        "name": "Absolute-Black-Granite-14",
        "image": "/bathroom/bathroomset14.jpg",
        "category": "marblebathroomsets"
    },
    {
        "id": 102,
        "name": "Absolute-Black-Granite-15",
        "image": "/bathroom/bathroomset15.jpg",
        "category": "marblebathroomsets"
    },
    {
        "id": 103,
        "name": "Absolute-Black-Granite-16",
        "image": "/bathroom/bathroomset16.jpg",
        "category": "marblebathroomsets"
    }, {
        "id": 104,
        "name": "Absolute-Black-Granite-1",
        "image": "/topwashingbasin/topwashinbesin1.jpg",
        "category": "tabletopwashbasins"
    },
    {
        "id": 105,
        "name": "Absolute-Black-Granite-2",
        "image": "/topwashingbasin/topwashinbesin2.jpg",
        "category": "tabletopwashbasins"
    },
    {
        "id": 106,
        "name": "Absolute-Black-Granite-3",
        "image": "/topwashingbasin/topwashinbesin3.jpg",
        "category": "tabletopwashbasins"
    },
    {
        "id": 107,
        "name": "Absolute-Black-Granite-4",
        "image": "/topwashingbasin/topwashinbesin4.jpg",
        "category": "tabletopwashbasins"
    },
    {
        "id": 108,
        "name": "Absolute-Black-Granite-5",
        "image": "/topwashingbasin/topwashinbesin5.jpg",
        "category": "tabletopwashbasins"
    },
    {
        "id": 109,
        "name": "Absolute-Black-Granite-6",
        "image": "/topwashingbasin/topwashinbesin6.jpg",
        "category": "tabletopwashbasins"
    },
    {
        "id": 110,
        "name": "Absolute-Black-Granite-7",
        "image": "/topwashingbasin/topwashinbesin7.jpg",
        "category": "tabletopwashbasins"
    },
    {
        "id": 111,
        "name": "Absolute-Black-Granite-8",
        "image": "/topwashingbasin/topwashinbesin8.jpg",
        "category": "tabletopwashbasins"
    },
    {
        "id": 112,
        "name": "Absolute-Black-Granite-9",
        "image": "/topwashingbasin/topwashinbesin9.jpg",
        "category": "tabletopwashbasins"
    },
    {
        "id": 113,
        "name": "Absolute-Black-Granite-10",
        "image": "/topwashingbasin/topwashinbesin10.jpg",
        "category": "tabletopwashbasins"
    },
    {
        "id": 114,
        "name": "Absolute-Black-Granite-11",
        "image": "/topwashingbasin/topwashinbesin11.jpg",
        "category": "tabletopwashbasins"
    },
    {
        "id": 115,
        "name": "Absolute-Black-Granite-12",
        "image": "/topwashingbasin/topwashinbesin12.jpg",
        "category": "tabletopwashbasins"
    },
    {
        "id": 116,
        "name": "Absolute-Black-Granite-13",
        "image": "/topwashingbasin/topwashinbesin13.jpg",
        "category": "tabletopwashbasins"
    },
    {
        "id": 117,
        "name": "Absolute-Black-Granite-14",
        "image": "/topwashingbasin/topwashinbesin14.jpg",
        "category": "tabletopwashbasins"
    },
    {
        "id": 118,
        "name": "Absolute-Black-Granite-15",
        "image": "/topwashingbasin/topwashinbesin15.jpg",
        "category": "tabletopwashbasins"
    },
    {
        "id": 119,
        "name": "Absolute-Black-Granite-16",
        "image": "/topwashingbasin/topwashinbesin16.jpg",
        "category": "tabletopwashbasins"
    },
    {
        "id": 120,
        "name": "Absolute-Black-Granite-17",
        "image": "/topwashingbasin/topwashinbesin17.jpg",
        "category": "tabletopwashbasins"
    },
    {
        "id": 121,
        "name": "Absolute-Black-Granite-18",
        "image": "/topwashingbasin/topwashinbesin18.jpg",
        "category": "tabletopwashbasins"
    },
    {
        "id": 122,
        "name": "Absolute-Black-Granite-19",
        "image": "/topwashingbasin/topwashinbesin19.jpg",
        "category": "tabletopwashbasins"
    },
    {
        "id": 123,
        "name": "Absolute-Black-Granite-20",
        "image": "/topwashingbasin/topwashinbesin20.jpg",
        "category": "tabletopwashbasins"
    },
    {
        "id": 124,
        "name": "Absolute-Black-Granite-21",
        "image": "/topwashingbasin/topwashinbesin21.jpg",
        "category": "tabletopwashbasins"
    },
    {
        "id": 125,
        "name": "Absolute-Black-Granite-1",
        "image": "/birdbath/birdbath1.jpg",
        "category": "birdbaths"
    },
    {
        "id": 126,
        "name": "Absolute-Black-Granite-2",
        "image": "/birdbath/birdbath2.jpg",
        "category": "birdbaths"
    },
    {
        "id": 127,
        "name": "Absolute-Black-Granite-3",
        "image": "/birdbath/birdbath3.jpg",
        "category": "birdbaths"
    },
    {
        "id": 128,
        "name": "Absolute-Black-Granite-4",
        "image": "/birdbath/birdbath4.jpg",
        "category": "birdbaths"
    },
    {
        "id": 129,
        "name": "Absolute-Black-Granite-5",
        "image": "/birdbath/birdbath5.jpg",
        "category": "birdbaths"
    },
    {
        "id": 130,
        "name": "Absolute-Black-Granite-6",
        "image": "/birdbath/birdbath6.jpg",
        "category": "birdbaths"
    },
    {
        "id": 131,
        "name": "Absolute-Black-Granite-7",
        "image": "/birdbath/birdbath7.jpg",
        "category": "birdbaths"
    },
    {
        "id": 132,
        "name": "Absolute-Black-Granite-8",
        "image": "/birdbath/birdbath8.jpg",
        "category": "birdbaths"
    },
    {
        "id": 133,
        "name": "Absolute-Black-Granite-9",
        "image": "/birdbath/birdbath9.jpg",
        "category": "birdbaths"
    },
    {
        "id": 134,
        "name": "Absolute-Black-Granite-10",
        "image": "/birdbath/birdbath10.jpg",
        "category": "birdbaths"
    },
    {
        "id": 135,
        "name": "Absolute-Black-Granite-11",
        "image": "/birdbath/birdbath11.jpg",
        "category": "birdbaths"
    },
    {
        "id": 136,
        "name": "Absolute-Black-Granite-1",
        "image": "/consoletable/consoletable1.jpg",
        "category": "consoletable"
    },
    {
        "id": 137,
        "name": "Absolute-Black-Granite-2",
        "image": "/consoletable/consoletable2.jpg",
        "category": "consoletable"
    },
    {
        "id": 138,
        "name": "Absolute-Black-Granite-3",
        "image": "/consoletable/consoletable3.jpg",
        "category": "consoletable"
    },
    {
        "id": 139,
        "name": "Absolute-Black-Granite-4",
        "image": "/consoletable/consoletable4.jpg",
        "category": "consoletable"
    },
    {
        "id": 140,
        "name": "Absolute-Black-Granite-5",
        "image": "/consoletable/consoletable5.jpg",
        "category": "consoletable"
    },
    {
        "id": 141,
        "name": "Absolute-Black-Granite-6",
        "image": "/consoletable/consoletable6.jpg",
        "category": "consoletable"
    },
    {
        "id": 142,
        "name": "Absolute-Black-Granite-7",
        "image": "/consoletable/consoletable7.jpg",
        "category": "consoletable"
    },
    {
        "id": 143,
        "name": "Absolute-Black-Granite-8",
        "image": "/consoletable/consoletable8.jpg",
        "category": "consoletable"
    },
    {
        "id": 144,
        "name": "Absolute-Black-Granite-9",
        "image": "/consoletable/consoletable9.jpg",
        "category": "consoletable"
    },
    {
        "id": 145,
        "name": "Absolute-Black-Granite-10",
        "image": "/consoletable/consoletable10.jpg",
        "category": "consoletable"
    },
    {
        "id": 146,
        "name": "Absolute-Black-Granite-11",
        "image": "/consoletable/consoletable11.jpg",
        "category": "consoletable"
    },
    {
        "id": 147,
        "name": "Absolute-Black-Granite-12",
        "image": "/consoletable/consoletable12.jpg",
        "category": "consoletable"
    },
    {
        "id": 148,
        "name": "Absolute-Black-Granite-13",
        "image": "/consoletable/consoletable13.jpg",
        "category": "consoletable"
    },
    {
        "id": 149,
        "name": "Absolute-Black-Granite-14",
        "image": "/consoletable/consoletable14.jpg",
        "category": "consoletable"
    },
    {
        "id": 150,
        "name": "Absolute-Black-Granite-15",
        "image": "/consoletable/consoletable15.jpg",
        "category": "consoletable"
    },
    {
        "id": 151,
        "name": "Absolute-Black-Granite-16",
        "image": "/consoletable/consoletable16.jpg",
        "category": "consoletable"
    },
    {
        "id": 152,
        "name": "Absolute-Black-Granite-17",
        "image": "/consoletable/consoletable17.jpg",
        "category": "consoletable"
    },
    {
        "id": 153,
        "name": "Absolute-Black-Granite-18",
        "image": "/consoletable/consoletable18.jpg",
        "category": "consoletable"
    },
    {
        "id": 154,
        "name": "Absolute-Black-Granite-19",
        "image": "/consoletable/consoletable19.jpg",
        "category": "consoletable"
    },
    {
        "id": 155,
        "name": "Absolute-Black-Granite-20",
        "image": "/consoletable/consoletable20.jpg",
        "category": "consoletable"
    },
    {
        "id": 156,
        "name": "Absolute-Black-Granite-21",
        "image": "/consoletable/consoletable21.jpg",
        "category": "consoletable"
    },
    {
        "id": 157,
        "name": "Absolute-Black-Granite-22",
        "image": "/consoletable/consoletable22.jpg",
        "category": "consoletable"
    },
    {
        "id": 158,
        "name": "Absolute-Black-Granite-23",
        "image": "/consoletable/consoletable23.jpg",
        "category": "consoletable"
    },
    {
        "id": 159,
        "name": "Absolute-Black-Granite-24",
        "image": "/consoletable/consoletable24.jpg",
        "category": "consoletable"
    },
    {
        "id": 160,
        "name": "Absolute-Black-Granite-25",
        "image": "/consoletable/consoletable25.jpg",
        "category": "consoletable"
    },
    {
        "id": 161,
        "name": "Absolute-Black-Granite-26",
        "image": "/consoletable/consoletable26.jpg",
        "category": "consoletable"
    },
    {
        "id": 162,
        "name": "Absolute-Black-Granite-27",
        "image": "/consoletable/consoletable27.jpg",
        "category": "consoletable"
    },
    {
        "id": 163,
        "name": "Absolute-Black-Granite-28",
        "image": "/consoletable/consoletable28.jpg",
        "category": "consoletable"
    },
    {
        "id": 164,
        "name": "Absolute-Black-Granite-29",
        "image": "/consoletable/consoletable29.jpg",
        "category": "consoletable"
    },
    {
        "id": 165,
        "name": "Absolute-Black-Granite-30",
        "image": "/consoletable/consoletable30.jpg",
        "category": "consoletable"
    },
    {
        "id": 166,
        "name": "Absolute-Black-Granite-31",
        "image": "/consoletable/consoletable31.jpg",
        "category": "consoletable"
    },
    {
        "id": 167,
        "name": "Absolute-Black-Granite-32",
        "image": "/consoletable/consoletable32.jpg",
        "category": "consoletable"
    },
    {
        "id": 168,
        "name": "Absolute-Black-Granite-33",
        "image": "/consoletable/consoletable33.jpg",
        "category": "consoletable"
    },
    {
        "id": 169,
        "name": "Absolute-Black-Granite-34",
        "image": "/consoletable/consoletable34.jpg",
        "category": "consoletable"
    },
    {
        "id": 170,
        "name": "Absolute-Black-Granite-35",
        "image": "/consoletable/consoletable35.jpg",
        "category": "consoletable"
    },
    {
        "id": 171,
        "name": "Absolute-Black-Granite-36",
        "image": "/consoletable/consoletable36.jpg",
        "category": "consoletable"
    },
    {
        "id": 172,
        "name": "Absolute-Black-Granite-37",
        "image": "/consoletable/consoletable37.jpg",
        "category": "consoletable"
    },
    {
        "id": 173,
        "name": "Absolute-Black-Granite-38",
        "image": "/consoletable/consoletable38.jpg",
        "category": "consoletable"
    },
    {
        "id": 174,
        "name": "Absolute-Black-Granite-39",
        "image": "/consoletable/consoletable39.jpg",
        "category": "consoletable"
    },
    {
        "id": 175,
        "name": "Absolute-Black-Granite-40",
        "image": "/consoletable/consoletable40.jpg",
        "category": "consoletable"
    },
    {
        "id": 176,
        "name": "Absolute-Black-Granite-41",
        "image": "/consoletable/consoletable41.jpg",
        "category": "consoletable"
    },
    {
        "id": 177,
        "name": "Absolute-Black-Granite-42",
        "image": "/consoletable/consoletable42.jpg",
        "category": "consoletable"
    },
    {
        "id": 178,
        "name": "Absolute-Black-Granite-43",
        "image": "/consoletable/consoletable43.jpg",
        "category": "consoletable"
    },
    {
        "id": 179,
        "name": "Absolute-Black-Granite-44",
        "image": "/consoletable/consoletable44.jpg",
        "category": "consoletable"
    },
    {
        "id": 180,
        "name": "Absolute-Black-Granite-45",
        "image": "/consoletable/consoletable45.jpg",
        "category": "consoletable"
    },
    {
        "id": 181,
        "name": "Absolute-Black-Granite-46",
        "image": "/consoletable/consoletable46.jpg",
        "category": "consoletable"
    },
    {
        "id": 182,
        "name": "Absolute-Black-Granite-47",
        "image": "/consoletable/consoletable47.jpg",
        "category": "consoletable"
    },
    {
        "id": 183,
        "name": "Absolute-Black-Granite-48",
        "image": "/consoletable/consoletable48.jpg",
        "category": "consoletable"
    },
    {
        "id": 184,
        "name": "Absolute-Black-Granite-49",
        "image": "/consoletable/consoletable49.jpg",
        "category": "consoletable"
    },
    {
        "id": 185,
        "name": "Absolute-Black-Granite-50",
        "image": "/consoletable/consoletable50.jpg",
        "category": "consoletable"
    },
    {
        "id": 186,
        "name": "Absolute-Black-Granite-51",
        "image": "/consoletable/consoletable51.jpg",
        "category": "consoletable"
    },
    {
        "id": 187,
        "name": "Absolute-Black-Granite-52",
        "image": "/consoletable/consoletable52.jpg",
        "category": "consoletable"
    },
    {
        "id": 188,
        "name": "Absolute-Black-Granite-53",
        "image": "/consoletable/consoletable53.jpg",
        "category": "consoletable"
    },
    {
        "id": 189,
        "name": "Absolute-Black-Granite-54",
        "image": "/consoletable/consoletable54.jpg",
        "category": "consoletable"
    },
    {
        "id": 190,
        "name": "Absolute-Black-Granite-55",
        "image": "/consoletable/consoletable55.jpg",
        "category": "consoletable"
    },
    {
        "id": 191,
        "name": "Absolute-Black-Granite-56",
        "image": "/consoletable/consoletable56.jpg",
        "category": "consoletable"
    },
    {
        "id": 192,
        "name": "Absolute-Black-Granite-57",
        "image": "/consoletable/consoletable57.jpg",
        "category": "consoletable"
    },
    {
        "id": 193,
        "name": "Absolute-Black-Granite-58",
        "image": "/consoletable/consoletable58.jpg",
        "category": "consoletable"
    },
    {
        "id": 194,
        "name": "Absolute-Black-Granite-59",
        "image": "/consoletable/consoletable59.jpg",
        "category": "consoletable"
    },
    {
        "id": 195,
        "name": "Absolute-Black-Granite-1",
        "image": "/sidetable/sidetable1.jpg",
        "category": "sidecorner"
    },
    {
        "id": 196,
        "name": "Absolute-Black-Granite-2",
        "image": "/sidetable/sidetable2.jpg",
        "category": "sidecorner"
    },
    {
        "id": 197,
        "name": "Absolute-Black-Granite-3",
        "image": "/sidetable/sidetable3.jpg",
        "category": "sidecorner"
    },
    {
        "id": 198,
        "name": "Absolute-Black-Granite-4",
        "image": "/sidetable/sidetable4.jpg",
        "category": "sidecorner"
    },
    {
        "id": 199,
        "name": "Absolute-Black-Granite-5",
        "image": "/sidetable/sidetable5.jpg",
        "category": "sidecorner"
    },
    {
        "id": 200,
        "name": "Absolute-Black-Granite-6",
        "image": "/sidetable/sidetable6.jpg",
        "category": "sidecorner"
    },
    {
        "id": 201,
        "name": "Absolute-Black-Granite-7",
        "image": "/sidetable/sidetable7.jpg",
        "category": "sidecorner"
    },
    {
        "id": 202,
        "name": "Absolute-Black-Granite-8",
        "image": "/sidetable/sidetable8.jpg",
        "category": "sidecorner"
    },
    {
        "id": 203,
        "name": "Absolute-Black-Granite-9",
        "image": "/sidetable/sidetable9.jpg",
        "category": "sidecorner"
    },
    {
        "id": 204,
        "name": "Absolute-Black-Granite-10",
        "image": "/sidetable/sidetable10.jpg",
        "category": "sidecorner"
    },
    {
        "id": 205,
        "name": "Absolute-Black-Granite-11",
        "image": "/sidetable/sidetable11.jpg",
        "category": "sidecorner"
    },
    {
        "id": 206,
        "name": "Absolute-Black-Granite-12",
        "image": "/sidetable/sidetable12.jpg",
        "category": "sidecorner"
    },
    {
        "id": 207,
        "name": "Absolute-Black-Granite-13",
        "image": "/sidetable/sidetable13.jpg",
        "category": "sidecorner"
    },
    {
        "id": 208,
        "name": "Absolute-Black-Granite-14",
        "image": "/sidetable/sidetable14.jpg",
        "category": "sidecorner"
    },
    {
        "id": 209,
        "name": "Absolute-Black-Granite-15",
        "image": "/sidetable/sidetable15.jpg",
        "category": "sidecorner"
    },
    {
        "id": 210,
        "name": "Absolute-Black-Granite-16",
        "image": "/sidetable/sidetable16.jpg",
        "category": "sidecorner"
    },
    {
        "id": 211,
        "name": "Absolute-Black-Granite-17",
        "image": "/sidetable/sidetable17.jpg",
        "category": "sidecorner"
    },
    {
        "id": 212,
        "name": "Absolute-Black-Granite-18",
        "image": "/sidetable/sidetable18.jpg",
        "category": "sidecorner"
    },
    {
        "id": 213,
        "name": "Absolute-Black-Granite-19",
        "image": "/sidetable/sidetable19.jpg",
        "category": "sidecorner"
    },
    {
        "id": 214,
        "name": "Absolute-Black-Granite-20",
        "image": "/sidetable/sidetable20.jpg",
        "category": "sidecorner"
    },
    {
        "id": 215,
        "name": "Absolute-Black-Granite-21",
        "image": "/sidetable/sidetable21.jpg",
        "category": "sidecorner"
    },
    {
        "id": 216,
        "name": "Absolute-Black-Granite-22",
        "image": "/sidetable/sidetable22.jpg",
        "category": "sidecorner"
    },
    {
        "id": 217,
        "name": "Absolute-Black-Granite-23",
        "image": "/sidetable/sidetable23.jpg",
        "category": "sidecorner"
    },
    {
        "id": 218,
        "name": "Absolute-Black-Granite-24",
        "image": "/sidetable/sidetable24.jpg",
        "category": "sidecorner"
    },
    {
        "id": 219,
        "name": "Absolute-Black-Granite-25",
        "image": "/sidetable/sidetable25.jpg",
        "category": "sidecorner"
    },
    {
        "id": 220,
        "name": "Absolute-Black-Granite-26",
        "image": "/sidetable/sidetable26.jpg",
        "category": "sidecorner"
    },
    {
        "id": 221,
        "name": "Absolute-Black-Granite-27",
        "image": "/sidetable/sidetable27.jpg",
        "category": "sidecorner"
    },
    {
        "id": 222,
        "name": "Absolute-Black-Granite-28",
        "image": "/sidetable/sidetable28.jpg",
        "category": "sidecorner"
    },
    {
        "id": 223,
        "name": "Absolute-Black-Granite-29",
        "image": "/sidetable/sidetable29.jpg",
        "category": "sidecorner"
    },
    {
        "id": 224,
        "name": "Absolute-Black-Granite-30",
        "image": "/sidetable/sidetable30.jpg",
        "category": "sidecorner"
    },
    {
        "id": 225,
        "name": "Absolute-Black-Granite-31",
        "image": "/sidetable/sidetable31.jpg",
        "category": "sidecorner"
    }


]
const ArtDetails = () => {
    const navigate = useNavigate()
    const { productId } = useParams()

    const categoryProducts = artProducts.filter(product => product.category === productId)
    console.log(productId)
    console.log(categoryProducts);
    const handleProductClick = (productId: string) => {
        navigate(`/artinformation/${productId}`)
    }
    return (
        <div>
            <ProductList products={categoryProducts} category={productId} onProductClick={handleProductClick} />




        </div>
    )
}

export default ArtDetails