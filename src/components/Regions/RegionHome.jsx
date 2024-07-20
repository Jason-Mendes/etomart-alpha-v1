import React, { useState, useMemo, useRef, useEffect } from "react";
import DOMPurify from "dompurify";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../Footer";
import LPNavBar from "../LPNavBar";
import XClearButton from '../componentsCalled/XClearButton'; // Ensure the path is correct and case-sensitive

function RegionHome() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  // Location buttons state
  const [isEditing, setIsEditing] = useState(false);
  const [location, setLocation] = useState("");
  const [numStars] = useState(5); // State for the number of stars
  const [currentSlide, setCurrentSlide] = useState(0);
  const [inputLocation, setInputLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userRegion, setUserRegion] = useState(null);
  const [confirmRegion, setConfirmRegion] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  // JavaScript
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  // Regions state
  const [nextPage, setNextPage] = useState("");
  const [selectedRegionLocation, setSelectedRegionLocation] = React.useState(null);
  const navigate = useNavigate();
  const showButtonLocation = useLocation();
  const selectedRegionButton = showButtonLocation.state?.selectedRegion || {};
  const [selectedTown, setSelectedTown] = useState(null);


  // Define the region data as a constant outside the component
  const townsData = {
    Khomas: [
      {
        code: "ALB",
        name: "Windhoek",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
        latitude: -22.559722,
        longitude: 17.083611
      },
      {
        code: "BUK",
        name: "Brakwater",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
        latitude: -22.580278,
        longitude: 17.122222
      },
      {
        code: "DOE",
        name: "Dordabis",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
        latitude: -22.870833,
        longitude: 17.405278
      },
      {
        code: "GBN",
        name: "Gobabis",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
        latitude: -22.442778,
        longitude: 18.980833
      },
      {
        code: "GRS",
        name: "Groendrift",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
        latitude: -22.764722,
        longitude: 17.069722
      },
      {
        code: "HCH",
        name: "Hochfeld",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
        latitude: -22.425278,
        longitude: 17.072222
      },
      {
        code: "KHR",
        name: "Khorixas",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
        latitude: -20.379722,
        longitude: 14.791111
      },
      {
        code: "OJO",
        name: "Ojozondjupa",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
        latitude: -21.263056,
        longitude: 16.806111
      },
      {
        code: "RHN",
        name: "Rehoboth",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
        latitude: -23.318056,
        longitude: 17.090278
      },
      {
        code: "WSN",
        name: "Witvlei",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
        latitude: -22.809722,
        longitude: 18.423611
      }
    ],
    Erongo: [
      {
        code: "ARA",
        name: "Arandis",
        flagPath: "/images/regions/erongo.jpeg",
        path: "/LP/Erongo/Towns",
        latitude: -22.359722,
        longitude: 15.659722
      },
      {
        code: "HEN",
        name: "Henties Bay",
        flagPath: "/images/regions/erongo.jpeg",
        path: "/LP/Erongo/Towns",
        latitude: -22.119444,
        longitude: 14.280833
      },
      {
        code: "KAR",
        name: "Karibib",
        flagPath: "/images/regions/erongo.jpeg",
        path: "/LP/Erongo/Towns",
        latitude: -21.945833,
        longitude: 15.582222
      },
      {
        code: "OMA",
        name: "Omaruru",
        flagPath: "/images/regions/erongo.jpeg",
        path: "/LP/Erongo/Towns",
        latitude: -21.833056,
        longitude: 15.945833
      },
      {
        code: "SWA",
        name: "Swakopmund",
        flagPath: "/images/regions/erongo.jpeg",
        path: "/LP/Erongo/Towns",
        latitude: -22.680833,
        longitude: 14.532222
      },
      {
        code: "UIS",
        name: "Uis",
        flagPath: "/images/regions/erongo.jpeg",
        path: "/LP/Erongo/Towns",
        latitude: -21.2675,
        longitude: 14.9344
      },
      {
        code: "WAL",
        name: "Walvis Bay",
        flagPath: "/images/regions/erongo.jpeg",
        path: "/LP/Erongo/Towns",
        latitude: -22.957222,
        longitude: 14.5125
      }
    ],
    Oshana: [
      {
        code: "ONG",
        name: "Ongwediva",
        flagPath: "/images/regions/oshana.jpeg",
        path: "/LP/Oshana/Towns",
        latitude: -17.827778,
        longitude: 15.969444
      },
      {
        code: "OSH",
        name: "Oshakati",
        flagPath: "/images/regions/oshana.jpeg",
        path: "/LP/Oshana/Towns",
        latitude: -17.762222,
        longitude: 15.677222
      },
      {
        code: "OND",
        name: "Ondangwa",
        flagPath: "/images/regions/oshana.jpeg",
        path: "/LP/Oshana/Towns",
        latitude: -17.891111,
        longitude: 15.8525
      }
    ],
    Omusati: [
      {
        code: "OUT",
        name: "Outapi",
        flagPath: "/images/regions/omusati.jpeg",
        path: "/LP/Omusati/Towns",
        latitude: -17.531111,
        longitude: 14.968056
      },
      {
        code: "OKA",
        name: "Okahao",
        flagPath: "/images/regions/omusati.jpeg",
        path: "/LP/Omusati/Towns",
        latitude: -17.429444,
        longitude: 14.850833
      },
      {
        code: "OZO",
        name: "Oshifo",
        flagPath: "/images/regions/omusati.jpeg",
        path: "/LP/Omusati/Towns",
        latitude: -17.539444,
        longitude: 14.7725
      }
    ],
    Karas: [
      {
        code: "KHB",
        name: "Keetmanshoop",
        flagPath: "/images/regions/kharas2.jpeg",
        path: "/LP/Karas/Towns",
        latitude: -26.583056,
        longitude: 16.924444
      },
      {
        code: "LUD",
        name: "Luderitz",
        flagPath: "/images/regions/kharas2.jpeg",
        path: "/LP/Karas/Towns",
        latitude: -26.641944,
        longitude: 15.159444
      },
      {
        code: "RSH",
        name: "Rosh Pinah",
        flagPath: "/images/regions/kharas2.jpeg",
        path: "/LP/Karas/Towns",
        latitude: -27.488333,
        longitude: 16.370833
      },
      {
        code: "ORM",
        name: "Oranjemund",
        flagPath: "/images/regions/kharas2.jpeg",
        path: "/LP/Karas/Towns",
        latitude: -28.665278,
        longitude: 16.553611
      }
    ],
    Ohangwena: [
      {
        code: "ENH",
        name: "Eenhana",
        flagPath: "/images/regions/ohangwena.jpeg",
        path: "/LP/Ohangwena/Towns",
        latitude: -17.627222,
        longitude: 15.949444
      },
      {
        code: "HNM",
        name: "Helao Nafidi",
        flagPath: "/images/regions/ohangwena.jpeg",
        path: "/LP/Ohangwena/Towns",
        latitude: -17.5925,
        longitude: 15.8742
      },
      {
        code: "OHS",
        name: "Ohangwena",
        flagPath: "/images/regions/ohangwena.jpeg",
        path: "/LP/Ohangwena/Towns",
        latitude: -17.684722,
        longitude: 15.919444
      },
      {
        code: "OKG",
        name: "Okongo",
        flagPath: "/images/regions/ohangwena.jpeg",
        path: "/LP/Ohangwena/Towns",
        latitude: -17.368611,
        longitude: 15.601111
      }
    ],
    Zambezi: [
      {
        code: "KAT",
        name: "Katima Mulilo",
        flagPath: "/images/regions/zambezi.jpeg",
        path: "/LP/Zambezi/Towns",
        latitude: -17.498333,
        longitude: 24.315833
      },
      {
        code: "BUK",
        name: "Bukalo",
        flagPath: "/images/regions/zambezi.jpeg",
        path: "/LP/Zambezi/Towns",
        latitude: -17.571944,
        longitude: 24.291389
      }
    ],
    Oshikoto: [
      {
        code: "TSU",
        name: "Tsumeb",
        flagPath: "/images/regions/oshikoto.jpeg",
        path: "/LP/Oshikoto/Towns",
        latitude: -19.233333,
        longitude: 17.733333
      },
      {
        code: "ONK",
        name: "Onankali",
        flagPath: "/images/regions/oshikoto.jpeg",
        path: "/LP/Oshikoto/Towns",
        latitude: -18.755833,
        longitude: 17.685833
      },
      {
        code: "OMU",
        name: "Omuthiya",
        flagPath: "/images/regions/oshikoto.jpeg",
        path: "/LP/Oshikoto/Towns",
        latitude: -18.694444,
        longitude: 17.588056
      }
    ],
    Omaheke: [
      {
        code: "GOB",
        name: "Gobabis",
        flagPath: "/images/regions/omaheke.jpeg",
        path: "/LP/Omaheke/Towns",
        latitude: -22.442778,
        longitude: 18.980833
      },
      {
        code: "WIT",
        name: "Witvlei",
        flagPath: "/images/regions/omaheke.jpeg",
        path: "/LP/Omaheke/Towns",
        latitude: -22.809722,
        longitude: 18.423611
      },
      {
        code: "LEO",
        name: "Leonardville",
        flagPath: "/images/regions/omaheke.jpeg",
        path: "/LP/Omaheke/Towns",
        latitude: -22.591944,
        longitude: 19.134444
      }
    ],
    Hardap: [
      {
        code: "MAR",
        name: "Mariental",
        flagPath: "/images/regions/hardap.jpeg",
        path: "/LP/Hardap/Towns",
        latitude: -24.573611,
        longitude: 17.961389
      },
      {
        code: "REH",
        name: "Rehoboth",
        flagPath: "/images/regions/hardap.jpeg",
        path: "/LP/Hardap/Towns",
        latitude: -23.318056,
        longitude: 17.090278
      },
      {
        code: "GIB",
        name: "Gibeon",
        flagPath: "/images/regions/hardap.jpeg",
        path: "/LP/Hardap/Towns",
        latitude: -24.823333,
        longitude: 17.329722
      }
    ],
    Otjozondjupa: [
      {
        code: "OKA",
        name: "Okahandja",
        flagPath: "/images/regions/otjozondjupa.jpeg",
        path: "/LP/Otjozondjupa/Towns",
        latitude: -21.816944,
        longitude: 15.973611
      },
      {
        code: "GRD",
        name: "Grootfontein",
        flagPath: "/images/regions/otjozondjupa.jpeg",
        path: "/LP/Otjozondjupa/Towns",
        latitude: -19.550833,
        longitude: 17.082222
      },
      {
        code: "OTJ",
        name: "Otjiwarongo",
        flagPath: "/images/regions/otjozondjupa.jpeg",
        path: "/LP/Otjozondjupa/Towns",
        latitude: -20.4625,
        longitude: 16.645
      },
      {
        code: "OTV",
        name: "Otavi",
        flagPath: "/images/regions/otjozondjupa.jpeg",
        path: "/LP/Otjozondjupa/Towns",
        latitude: -19.666111,
        longitude: 17.400833
      }
    ],
    Kunene: [
      {
        code: "OPO",
        name: "Opuwo",
        flagPath: "/images/regions/kunene2.jpeg",
        path: "/LP/Kunene/Towns",
        latitude: -18.059722,
        longitude: 13.842222
      },
      {
        code: "KHX",
        name: "Khorixas",
        flagPath: "/images/regions/kunene2.jpeg",
        path: "/LP/Kunene/Towns",
        latitude: -20.379722,
        longitude: 14.791111
      },
      {
        code: "SES",
        name: "Sesfontein",
        flagPath: "/images/regions/kunene2.jpeg",
        path: "/LP/Kunene/Towns",
        latitude: -19.964167,
        longitude: 14.655833
      }
    ],
    KavangoEast: [
      {
        code: "RUN",
        name: "Rundu",
        flagPath: "/images/regions/kavango_east.jpeg",
        path: "/LP/KavangoEast/Towns",
        latitude: -17.930833,
        longitude: 19.774444
      },
      {
        code: "DIV",
        name: "Divundu",
        flagPath: "/images/regions/kavango_east.jpeg",
        path: "/LP/KavangoEast/Towns",
        latitude: -17.470833,
        longitude: 19.063611
      }
    ],
    KavangoWest: [
      {
        code: "NKU",
        name: "Nkurenkuru",
        flagPath: "/images/regions/kavango_west.jpeg",
        path: "/LP/KavangoWest/Towns",
        latitude: -17.8325,
        longitude: 19.0842
      },
      {
        code: "MPU",
        name: "Mpungu",
        flagPath: "/images/regions/kavango_west.jpeg",
        path: "/LP/KavangoWest/Towns",
        latitude: -17.8361,
        longitude: 19.0761
      }
    ]
    // Add other towns similarly...
  };




  const regions = {
    Khomas: [
      {
        code: "ALB",
        name: "Khomas",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Region",
      },
    ],
    Erongo: [
      {
        code: "HRV",
        name: "Erongo",
        flagPath: "/images/regions/erongo.jpeg",
        path: "/LP/Region",
      },
    ],
    Oshana: [
      {
        code: "CYP",
        name: "Oshana",
        flagPath: "/images/regions/oshana.jpeg",
        path: "/LP/Region",
      },
    ],
    Omusati: [
      {
        code: "ALB",
        name: "Omusati",
        flagPath: "/images/regions/omusati.jpeg",
        path: "/LP/Region",
      },
    ],
    Karas: [
      {
        code: "HRV",
        name: "Karas",
        flagPath: "/images/regions/kharas2.jpeg",
        path: "/LP/Region",
      },
    ],
    Ohangwena: [
      {
        code: "CYP",
        name: "Ohangwena",
        flagPath: "/images/regions/ohangwena.jpeg",
        path: "/LP/Region",
      },
    ],
    Zambezi: [
      {
        code: "ALB",
        name: "Zambezi",
        flagPath: "/images/regions/zambezi.jpeg",
        path: "/LP/Region",
      },
    ],
    Oshikoto: [
      {
        code: "HRV",
        name: "Oshikoto",
        flagPath: "/images/regions/oshikoto.jpeg",
        path: "/LP/Region",
      },
    ],
    Omaheke: [
      {
        code: "CYP",
        name: "Omaheke",
        flagPath: "/images/regions/omaheke.jpeg",
        path: "/LP/Region",
      },
    ],
    Hardap: [
      {
        code: "ALB",
        name: "Hardap",
        flagPath: "/images/regions/hardap.jpeg",
        path: "/LP/Region",
      },
    ],
    Otjozondjupa: [
      {
        code: "HRV",
        name: "Otjozondjupa",
        flagPath: "/images/regions/otjozondjupa.jpeg",
        path: "/LP/Region",
      },
    ],
    Kunene: [
      {
        code: "CYP",
        name: "Kunene",
        flagPath: "/images/regions/kunene2.jpeg",
        path: "/LP/Region",
      },
    ],
    KavangoEast: [
      {
        code: "ALB",
        name: "Kavango East",
        flagPath: "/images/regions/kavango_east.jpeg",
        path: "/LP/Region",
      },
    ],
    KavangoWest: [
      {
        code: "HRV",
        name: "Kavango West",
        flagPath: "/images/regions/kavango_west.jpeg",
        path: "/LP/Region",
      },
    ],
  };

  const buttonForSelectedRegion = regions[selectedRegionButton.name] || [];
  const regionDetails = buttonForSelectedRegion[0] || {};

  const routerLocation = useLocation();
  const selectedRegion = routerLocation.state?.selectedRegion;

  const townsByRegion = {
    Khomas: [
      {
        code: "ALB",
        name: "Windhoek",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
      },
      {
        code: "BUK",
        name: "Brakwater",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
      },
      {
        code: "DOE",
        name: "Dordabis",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
      },
      {
        code: "GBN",
        name: "Gobabis",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
      },
      {
        code: "GRS",
        name: "Groendrift",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
      },
      {
        code: "HCH",
        name: "Hochfeld",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
      },
      {
        code: "KHR",
        name: "Khorixas",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
      },
      {
        code: "OJO",
        name: "Ojozondjupa",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
      },
      {
        code: "RHN",
        name: "Rehoboth",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
      },
      {
        code: "WSN",
        name: "Witvlei",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
      },
    ],
    Erongo: [
      {
        code: "ARA",
        name: "Arandis",
        flagPath: "/images/regions/erongo.jpeg",
        path: "/LP/Erongo/Towns",
      },
      {
        code: "HEN",
        name: "Henties Bay",
        flagPath: "/images/regions/erongo.jpeg",
        path: "/LP/Erongo/Towns",
      },
      {
        code: "KAR",
        name: "Karibib",
        flagPath: "/images/regions/erongo.jpeg",
        path: "/LP/Erongo/Towns",
      },
      {
        code: "OMA",
        name: "Omaruru",
        flagPath: "/images/regions/erongo.jpeg",
        path: "/LP/Erongo/Towns",
      },
      {
        code: "SWA",
        name: "Swakopmund",
        flagPath: "/images/regions/erongo.jpeg",
        path: "/LP/Erongo/Towns",
      },
      {
        code: "UIS",
        name: "Uis",
        flagPath: "/images/regions/erongo.jpeg",
        path: "/LP/Erongo/Towns",
      },
      {
        code: "WAL",
        name: "Walvis Bay",
        flagPath: "/images/regions/erongo.jpeg",
        path: "/LP/Erongo/Towns",
      },
    ],
    //Towns Stuff for Oshana
    Oshana: [
      {
        code: "ONG",
        name: "Ongwediva",
        flagPath: "/images/regions/oshana.jpeg",
        path: "/LP/Oshana/Towns",
      },
      {
        code: "OSH",
        name: "Oshakati",
        flagPath: "/images/regions/oshana.jpeg",
        path: "/LP/Oshana/Towns",
      },
      {
        code: "OND",
        name: "Ondangwa",
        flagPath: "/images/regions/oshana.jpeg",
        path: "/LP/Oshana/Towns",
      },
    ],

    //Towns Stuff for Omusati
    Omusati: [
      {
        code: "OUT",
        name: "Outapi",
        flagPath: "/images/regions/omusati.jpeg",
        path: "/LP/Omusati/Towns",
      },
      {
        code: "OKA",
        name: "Okahao",
        flagPath: "/images/regions/omusati.jpeg",
        path: "/LP/Omusati/Towns",
      },
      {
        code: "OZO",
        name: "Oshifo",
        flagPath: "/images/regions/omusati.jpeg",
        path: "/LP/Omusati/Towns",
      },
    ],

    //Towns Stuff for Karas
    Karas: [
      {
        code: "KHB",
        name: "Keetmanshoop",
        flagPath: "/images/regions/kharas2.jpeg",
        path: "/LP/Karas/Towns",
      },
      {
        code: "LUD",
        name: "Luderitz",
        flagPath: "/images/regions/kharas2.jpeg",
        path: "/LP/Karas/Towns",
      },
      {
        code: "RSH",
        name: "Rosh Pinah",
        flagPath: "/images/regions/kharas2.jpeg",
        path: "/LP/Karas/Towns",
      },
      {
        code: "ORM",
        name: "Oranjemund",
        flagPath: "/images/regions/kharas2.jpeg",
        path: "/LP/Karas/Towns",
      },
    ],

    //Towns Stuff for Ohangwena
    Ohangwena: [
      {
        code: "ENH",
        name: "Eenhana",
        flagPath: "/images/regions/ohangwena.jpeg",
        path: "/LP/Ohangwena/Towns",
      },
      {
        code: "HNM",
        name: "Helao Nafidi",
        flagPath: "/images/regions/ohangwena.jpeg",
        path: "/LP/Ohangwena/Towns",
      },
      {
        code: "OHS",
        name: "Ohangwena",
        flagPath: "/images/regions/ohangwena.jpeg",
        path: "/LP/Ohangwena/Towns",
      },
      {
        code: "OKG",
        name: "Okongo",
        flagPath: "/images/regions/ohangwena.jpeg",
        path: "/LP/Ohangwena/Towns",
      },
    ],

    //Towns Stuff for Zambezi
    Zambezi: [
      {
        code: "KAT",
        name: "Katima Mulilo",
        flagPath: "/images/regions/zambezi.jpeg",
        path: "/LP/Zambezi/Towns",
      },
      {
        code: "BUK",
        name: "Bukalo",
        flagPath: "/images/regions/zambezi.jpeg",
        path: "/LP/Zambezi/Towns",
      },
    ],

    //Towns Stuff for Oshikoto
    Oshikoto: [
      {
        code: "TSU",
        name: "Tsumeb",
        flagPath: "/images/regions/oshikoto.jpeg",
        path: "/LP/Oshikoto/Towns",
      },
      {
        code: "ONK",
        name: "Onankali",
        flagPath: "/images/regions/oshikoto.jpeg",
        path: "/LP/Oshikoto/Towns",
      },
      {
        code: "OMU",
        name: "Omuthiya",
        flagPath: "/images/regions/oshikoto.jpeg",
        path: "/LP/Oshikoto/Towns",
      },
    ],

    //Towns Stuff for Omaheke
    Omaheke: [
      {
        code: "GOB",
        name: "Gobabis",
        flagPath: "/images/regions/omaheke.jpeg",
        path: "/LP/Omaheke/Towns",
      },
      {
        code: "WIT",
        name: "Witvlei",
        flagPath: "/images/regions/omaheke.jpeg",
        path: "/LP/Omaheke/Towns",
      },
      {
        code: "LEO",
        name: "Leonardville",
        flagPath: "/images/regions/omaheke.jpeg",
        path: "/LP/Omaheke/Towns",
      },
    ],

    //Towns Stuff for Hardap
    Hardap: [
      {
        code: "MAR",
        name: "Mariental",
        flagPath: "/images/regions/hardap.jpeg",
        path: "/LP/Hardap/Towns",
      },
      {
        code: "REH",
        name: "Rehoboth",
        flagPath: "/images/regions/hardap.jpeg",
        path: "/LP/Hardap/Towns",
      },
      {
        code: "GIB",
        name: "Gibeon",
        flagPath: "/images/regions/hardap.jpeg",
        path: "/LP/Hardap/Towns",
      },
    ],

    //Towns Stuff for Otjozondjupa
    Otjozondjupa: [
      {
        code: "OKA",
        name: "Okahandja",
        flagPath: "/images/regions/otjozondjupa.jpeg",
        path: "/LP/Otjozondjupa/Towns",
      },
      {
        code: "GRD",
        name: "Grootfontein",
        flagPath: "/images/regions/otjozondjupa.jpeg",
        path: "/LP/Otjozondjupa/Towns",
      },
      {
        code: "OTJ",
        name: "Otjiwarongo",
        flagPath: "/images/regions/otjozondjupa.jpeg",
        path: "/LP/Otjozondjupa/Towns",
      },
      {
        code: "OTV",
        name: "Otavi",
        flagPath: "/images/regions/otjozondjupa.jpeg",
        path: "/LP/Otjozondjupa/Towns",
      },
    ],

    //Towns Stuff for Kunene
    Kunene: [
      {
        code: "OPO",
        name: "Opuwo",
        flagPath: "/images/regions/kunene2.jpeg",
        path: "/LP/Kunene/Towns",
      },
      {
        code: "KHX",
        name: "Khorixas",
        flagPath: "/images/regions/kunene2.jpeg",
        path: "/LP/Kunene/Towns",
      },
      {
        code: "SES",
        name: "Sesfontein",
        flagPath: "/images/regions/kunene2.jpeg",
        path: "/LP/Kunene/Towns",
      },
    ],

    //Towns Stuff for Kavango East
    KavangoEast: [
      {
        code: "RUN",
        name: "Rundu",
        flagPath: "/images/regions/kavango_east.jpeg",
        path: "/LP/KavangoEast/Towns",
      },
      {
        code: "DIV",
        name: "Divundu",
        flagPath: "/images/regions/kavango_east.jpeg",
        path: "/LP/KavangoEast/Towns",
      },
    ],

    //Towns Stuff for Kavango West
    KavangoWest: [
      {
        code: "NKU",
        name: "Nkurenkuru",
        flagPath: "/images/regions/kavango_west.jpeg",
        path: "/LP/KavangoWest/Towns",
      },
      {
        code: "MPU",
        name: "Mpungu",
        flagPath: "/images/regions/kavango_west.jpeg",
        path: "/LP/KavangoWest/Towns",
      },
    ],
    // Add other regions' towns similarly...
  };

  const townsForSelectedRegion = townsByRegion[selectedRegion.name] || [];

  const handleTownsClick = (path) => {
    navigate(path);
  };


  const clearLocation = () => {
    setLocation("");
    setIsDropdownOpen(false);
    setIsEditing(false);
  };

  const handleSelect = (option) => {
    setSelectedTown(option);
    setLocation(option.name);
    setIsEditing(false);
    if (option) {
      navigate(option.path, { state: { selectedRegion: option.region, selectedTown: option.name } });
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          const { region, town } = determineRegionAndTown(latitude, longitude);
          setUserRegion(region);
          setLocation(town);
          setConfirmRegion(true);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location", error);
          alert("Error getting location");
          setIsLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser");
    }
  };

  const determineRegionAndTown = (latitude, longitude) => {
    let closestRegion = null;
    let closestTown = null;
    let closestDistance = Infinity;

    Object.entries(townsData).forEach(([regionName, towns]) => {
      towns.forEach(town => {
        const distance = getDistance(latitude, longitude, town.latitude, town.longitude);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestRegion = regionName;
          closestTown = town.name;
        }
      });
    });

    return { region: closestRegion, town: closestTown };
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      0.5 - Math.cos(dLat) / 2 +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * (1 - Math.cos(dLon)) / 2;

    return R * 2 * Math.asin(Math.sqrt(a));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocation(value);

    if (value.length > 0) {
      const newSuggestions = [];
      Object.entries(townsData).forEach(([regionName, towns]) => {
        towns.forEach(town => {
          if (town.name.toLowerCase().includes(value.toLowerCase())) {
            newSuggestions.push({
              ...town,
              region: regionName
            });
          }
        });
      });
      setSuggestions(newSuggestions);
      setIsDropdownOpen(true);
    } else {
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  };

  const confirmRegionSelection = () => {
    if (userRegion) {
      const region = townsData[userRegion];
      navigate(region[0].path, { state: { selectedRegion: userRegion } });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest('#protected-div')
      ) {
        setIsDropdownOpen(false);
        setIsEditing(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleInputChanges = (event) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    setInputLocation(sanitizedValue);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleWatchVideo = () => {
    setIsVideoVisible(true);
  };

  const handleVideoEnded = () => {
    setIsVideoVisible(false);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? testimonials.length - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === testimonials.length - 1 ? 0 : prevSlide + 1
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const testimonials = [
    {
      imageSrc: "/images/img_ellipse1.png",
      textBelowImage: "Lorem ipsum dolor sit amet consectetur.",
      numStars: 1,
      testimonialAuthor: "John Doe",
    },
    {
      imageSrc: "/images/img_ellipse1.png",
      textBelowImage:
        "Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.",
      numStars: 5,
      testimonialAuthor: "John Doe",
    },
    {
      imageSrc: "/images/img_ellipse1.png",
      textBelowImage:
        "Dolor at fringilla quam. Dolor turpis molestie dui magnis facilisis at fringil at fringilla quam. Dolor turpis molestie dui magnis facilisis at fringil Dolor at fringilla quam. Dolor turpis molestie dui magnis facilisis at fringil at fringilla quam. Dolor turpis molestie dui magnis facilisis at fringil",
      numStars: 3,
      testimonialAuthor: "John Doe",
    },
    // Add more testimonials as needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === testimonials.length - 1 ? 0 : prevSlide + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div>
      <LPNavBar />
      <div id="Landing_Page_Main_Body" className="content-wrapper">
        <div className="overflow-auto bg-[#fafafa]">
          {/* Hero Section */}
          <div className="bg-[#ee9613] border border-solid border-white-A700_19 rounded-tr-[150px] rounded-bl-[150px] rounded-br-[150px] shadow-xl relative p-4 w-full overflow-auto">
            <div id="text_1_image_container" className="relative">
              <div className="container mx-auto rounded-bl-[150px] rounded-br-[150px] flex flex-row md:flex-row items-center px-10">
                <div
                  id="text_1_container"
                  className="relative flex justify-between items-center p-2 md:pb-20 pb-14"
                  style={{ width: "100%", margin: "0 auto" }}
                >
                  <p className="relative sm:text-3xl text-nowrap md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl text-black-900 font-Agbalumo font-bold lg:ml-24">
                    Your Daily Food <br /> Delivered <br /> Hot & Fresh
                  </p>
                </div>
                <div
                  id="text_1_image_container"
                  className="flex flex-row md:flex-row items-center justify-evenly md:gap-0 lg:gap-16 xl:gap-20 2xl:gap-72 md:mr-2 mr-2 md:p-2"
                  style={{ width: "100%", maxWidth: "100vw", margin: "0 auto" }}
                >
                  <div id="image_container" className="relative px-10 m-2">
                    <img
                      className="relative object-cover rounded-bl-[200px] rounded-br-[126px] rounded-tr-[200px] w-96 h-auto md:w-screen md:h-60 lg:w-screen lg:h-64 xl:w-screen xl:h-72 2xl:w-screen 2xl:h-80"
                      src="/images/Main_groceries_reverse.jpg"
                      loading="lazy"
                      alt="Groceries"
                    />
                    <div
                      id="text_2_container"
                      className="relative flex flex-col items-center justify-center p-2 w-auto"
                    >
                      <p
                        className="text-xs sm:text-base md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-5xl text-white font-josefin_sans font-bold text-center whitespace-nowrap"
                        style={{ width: "100%", margin: "0 auto" }}
                      >
                        Groceries, Meals, Pharmacies, anything!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location Buttons Section */}
          <div id="LP_location_buttons_container_2" className="flex relative m-8">
            <div id="button-group" className="flex flex-row items-center container justify-between w-auto">
              <div className="flex flex-col items-center pr-8">
                <div className="flex flex-col max-w-sm items-center space-y-4">
                  <div
                    id="protected-div"
                    className="flex items-center bg-white text-gray-600 px-8 py-2 rounded-full shadow-md border border-gray-300 transition-transform transform hover:scale-105 relative"
                    onClick={() => {
                      setIsEditing(true);
                      setIsDropdownOpen(true);
                    }}
                  >
                    <img
                      className="h-7 mr-2"
                      src="/images/img_linkedin.svg"
                      alt="LinkedIn"
                      loading="lazy"
                    />
                    {isEditing ? (
                      <input
                        ref={inputRef}
                        className="text-md bg-transparent border-none focus:outline-none flex-grow"
                        type="text"
                        value={location}
                        placeholder="Search for a town"
                        autoFocus
                        onChange={handleInputChange}
                      />
                    ) : (
                      <span className="text-md flex-grow">{location || "Search for a town"}</span>
                    )}
                    {location && (
                      <XClearButton
                        onClick={(e) => {
                          e.stopPropagation();
                          clearLocation();
                        }}
                        className="absolute right-2 top-2/2 transform -translate-y-2.5"
                      />
                    )}
                  </div>
                  {isDropdownOpen && suggestions.length > 0 && (
                    <div
                      ref={dropdownRef}
                      className="flex flex-col max-w-sm items-center space-y-2 bg-white border border-gray-300 shadow-md w-full max-h-60 overflow-y-auto z-10"
                    >
                      {suggestions.map((town) => (
                        <div
                          key={`${town.region}-${town.name}`}
                          onClick={() => handleSelect(town)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer w-full text-left"
                        >
                          {town.name} ({town.region})
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  className="flex items-center bg-white text-black px-4 py-2 rounded-full shadow-md border border-gray-300 transition-transform transform hover:scale-105 mt-4"
                  onClick={handleUseCurrentLocation}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
                  ) : (
                    <img
                      className="h-5 mr-2"
                      src="/images/img_save.svg"
                      alt="save"
                      loading="lazy"
                    />
                  )}
                  <p className="text-base font-bold">
                    {isLoading ? "Getting Location..." : "Use Current Location"}
                  </p>
                </button>
              </div>
              <div className="flex flex-col items-center">
                {!isLoading && confirmRegion && userRegion && (
                  <div className="text-center">
                    <p>Are you in <b>{location}</b>, from <b>{userRegion}</b> region?</p>
                    <button
                      className="flex items-center justify-center m-2 hover:bg-black hover:text-white font-josefin_sans px-4 py-2 bg-[#ff9f10] text-black rounded-full"
                      onClick={confirmRegionSelection}
                    >
                      Confirm Location
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Region Selection Section */}
          <div
            id="LP_section_3_orange"
            className="flex-col sm:flex-col md:flex-row items-center justify-center bg-[#ee9613] border border-solid border-white-A700_19 rounded-bl-[150px] rounded-br-[150px] shadow-xl relative md:h-auto md:p-10 h-auto p-10"
          >
            <div className="flex flex-col md:flex-row w-full">
              <div className="md:w-1/2 md:pr-4 md:mb-6">
                <div className="text-container md:flex md:items-end md:justify-end whitespace-nowrap sm:whitespace-wrap md:whitespace-wrap lg:whitespace-wrap xl:whitespace-wrap sd:mt-2">
                  {isLargeScreen ? (
                    <span className="sm:text-3xl md:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-black-900 font-Agbalumo sm:ml-16 sm:mr-0 md:mr-0 md:ml-0 md:py-0 lg:mt-0 lg:my-0">
                      Explore Etomart Towns
                    </span>
                  ) : (
                    <span className="flex justify-center text-xl text-black-900 font-Agbalumo font-bold">
                      Explore Etomart Towns
                    </span>
                  )}
                </div>
                <div className="text-container md:flex md:items-end md:justify-end whitespace-nowrap sm:whitespace-wrap md:whitespace-wrap lg:whitespace-wrap xl:whitespace-wrap sd:mt-2 mt-0 md:mt-4">
                  {isLargeScreen ? (
                    <span className="text-base sm:text-base md:text-base lg:text-2xl xl:text-3xl 2xl:text-4xl text-white font-josefin_sans mt-0 mb-4 sm:ml-16 sm:mr-0 md:mr-0 md:ml-0">
                      Delivered to you at your convenience!
                    </span>
                  ) : (
                    <span className="flex justify-center text-base text-white font-josefin_sans">
                      Delivered to you at your convenience!
                    </span>
                  )}
                </div>
              </div>

              <div className="md:w-1/2 md:pl-4 mt-6 md:mt-0">
                <div className="flex items-center justify-center">
                  <div className="flex flex-wrap justify-center gap-4 pb-6 pt-6">
                    <div className="flex justify-center w-full">
                      <div className="flex flex-row gap-4 w-full">
                        <button className="flex justify-center items-center bg-orange-300 text-black px-4 py-2 rounded-[36px] shadow-lg font-josefin_sans max-w-[240px] h-14 overflow-hidden">
                          <div className="flex items-center">
                            <img
                              className="rounded-[36px] h-8 mr-2"
                              src={regionDetails.flagPath}
                              alt={`${regionDetails.name} flag`}
                              loading="lazy"
                            />
                            <p className="text-center text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl text-gray-700 font-bold">
                              {regionDetails?.name || 'Select a Region'}
                            </p>
                          </div>
                        </button>
                        <button className="flex justify-center items-center bg-white text-black px-4 py-2 rounded-[36px] shadow-lg font-josefin_sans hover:bg-orange-300 min-w-[150px] h-14 overflow-hidden">
                          <div className="flex items-center justify-between w-full">
                            <a
                              href="/LP"
                              className="text-center text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-xl text-gray-700 font-bold"
                            >
                              All Regions
                            </a>
                            <div className="flex items-center justify-end -mr-2">
                              <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-6 fill-current text-zinc-950 transform rotate-180"
                              >
                                <g fill="none" fillRule="evenodd">
                                  <path fill="none" d="M0 0h24v24H0z" />
                                  <path
                                    d="M16.5 18a.498.498 0 01-.37-.836L20.824 12 16.13 6.836a.499.499 0 11.74-.672l5 5.5a.5.5 0 010 .672l-5 5.5a.498.498 0 01-.37.164"
                                    fill="#202125"
                                  />
                                </g>
                              </svg>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Towns Buttons based on the region selected in the landing page */}
            <div
              id="button-sizing"
              className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-44 py-0 px-16"
            >
              {townsForSelectedRegion.map((town) => (
                <div key={town.code} className="flex justify-center w-full">
                  <div className="button-row flex flex-col gap-4 mb-4">
                    <button
                      className="flex flex-shrink-0 justify-between items-center bg-white hover:bg-orange-300 text-black px-4 py-2 ml-0 rounded-[36px] shadow-lg font-josefin_sans min-w-[220px] overflow-hidden"
                      onClick={() => handleTownsClick(town.path)}
                    >
                      <div className="flex items-center flex-grow">
                        <p className="text-left text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-700 font-bold flex-shrink-0">
                          {town.name}
                        </p>
                      </div>
                      <div className="ml-auto pr-2 flex-shrink-0">
                        <svg
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-6 fill-current text-zinc-950"
                        >
                          <g fill="none" fillRule="evenodd">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                              d="M16.5 18a.498.498 0 01-.37-.836L20.824 12 16.13 6.836a.499.499 0 11.74-.672l5 5.5a.5.5 0 010 .672l-5 5.5a.498.498 0 01-.37.164"
                              fill="#202125"
                            />
                          </g>
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Did You Know Section */}
          <div
            id="LP_location_buttons_container_2"
            className="flex items-center justify-center p-8 mx-auto sm:max-w-full md:max-w-screen lg:max-w-screen xl:max-w-screen 2xl:max-w-screen"
            style={{
              maxWidth: "1800px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div
              id="LP_Did_you_know_container_4"
              class="flex flex-col gap-[35px] items-center justify-start w-auto md:w-full pt-16 pb-6"
            >
              <div class="flex flex-col items-center justify-center px-2.5 py-[3px] w-auto">
                <p class="text-left md:text-5xl text-6xl text-black w-auto font-bold font-Agbalumo">
                  Did you Know?
                </p>
              </div>
              <div class="flex flex-col items-center justify-center px-2.5 py-[3px] w-auto">
                <p class="text-center sm:text-[21px] md:text-[23px] text-[25px] max-w-xl text-zinc-950_01 font-josefin_sans font-semibold">
                  Lorem ipsum dolor sit amet consectetur. Non tincidunt magna
                  non et elit. Dolor turpis molestie dui magnis facilisis at
                  fringilla quam.
                </p>
              </div>
            </div>
          </div>

          {/* What is Etomart Section */}
          <div
            id="LP_section_3_orange"
            className="flex flex-col items-center justify-center bg-[#ee9613] border border-solid border-white-A700_19 rounded-bl-[150px] rounded-br-[150px] shadow-xl relative md:p-10 p-5"
            style={{ width: "100%", maxWidth: "100vw", margin: "0 auto" }}
          >
            <div
              className={`flex flex-col md:flex-row justify-center items-center gap-8 p-4 transition-all duration-500 relative z-10 mb-16 ${isVideoVisible ? "opacity-0 pointer-events-none" : ""
                }`}
            >
              <div
                id="What_is_Etomart"
                className="flex items-center justify-center w-full md:w-1/2 px-4 md:px-0 z-10"
              >
                <div
                  id="text"
                  className="relative max-w-3xl p-4 md:p-16 text-center"
                >
                  <h2 className="text-2xl md:text-5xl font-Agbalumo font-bold text-black mb-4">
                    What is Etomart?
                  </h2>
                  <p className="text-base md:text-xl text-white font-medium mb-8">
                    Etomart makes it incredibly easy for you to discover and get
                    what you want. Delivered to you – quickly, reliably and
                    affordably.
                  </p>
                  <button
                    className="bg-white text-black px-6 py-2 md:px-8 md:py-3 rounded-full font-semibold shadow-md transition-all duration-300 hover:bg-orange-300"
                    onClick={handleWatchVideo}
                    style={{ position: "relative", zIndex: "999" }}
                  >
                    <span>Watch Video</span>
                  </button>
                </div>
              </div>
              <div
                id="card"
                className="flex flex-wrap justify-center gap-6 w-full md:w-1/2 p-4 md:px-0 z-10"
              >
                <div className="bg-white w-full md:w-auto h-full bg-cover bg-center rounded-lg flex flex-col items-center py-4 md:py-[21px] px-4 md:px-[21px] max-w-[200px] sm:max-w-[300px] md:max-w-[400px] max-h-[200px] sm:max-h-[300px] md:max-h-[450px] shadow-md relative">
                  <div className="w-full max-w-[200px] sm:max-w-[300px] md:max-w-none max-h-[200px] sm:max-h-[300px] md:max-h-[400px] flex items-center justify-center">
                    <img
                      className="w-full h-auto rounded-xl"
                      src="/images/website_intro/video-cover-image-4.jpg"
                      alt="web_intro"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              id="video-container"
              className={`flex flex-col justify-center items-center transition-all duration-500 ${isVideoVisible ? "" : "opacity-0 pointer-events-none"
                }`}
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                zIndex: "1",
              }}
            >
              <div
                id="description"
                className="m-4 relative max-w-3xl p-4 text-center"
              >
                <h2 className="text-2xl md:text-5xl font-Agbalumo font-bold text-black">
                  This is Etomart!
                </h2>
              </div>
              <div
                id="video"
                className="m-4 relative flex align-items-center md:w-[600px] md:h-[350px]"
              >
                <video
                  className="absolute rounded-3xl inset-0 w-full h-full object-fill"
                  poster="/images/website_intro/video-cover-image-4.jpg"
                  controls
                  volume={0.5}
                  onEnded={handleVideoEnded}
                >
                  <source
                    src="/videos/website_intro/etomart_Brand_Intro.mp4"
                    type="video/mp4"
                  />
                  <source
                    src="/videos/website_intro/etomart_Brand_Intro.webm"
                    type="video/webm"
                  />
                </video>

              </div>
              <div
                id="description"
                className="m-4 relative max-w-3xl p-4 text-center "
              >
                <p className="text-base md:text-xl text-white font-medium mb-4  px-16 ">
                  Etomart makes it incredibly easy for you to discover and get
                  what you want. Delivered to you – quickly, reliably and
                  affordably.
                </p>
              </div> </div> </div>

          {/* Testimonials Section */}
          <div
            id="LP_location_Testimonials_container_2"
            className="flex items-center justify-center p-16 mx-auto sm:max-w-full md:max-w-screen lg:max-w-screen xl:max-w-screen 2xl:max-w-screen"
            style={{
              maxWidth: "1800px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div
              id="Testimonials Card"
              className="flex flex-col items-center justify-center w-full -mt-16"
            >
              <div
                id="LP_testimonials_container_4"
                className="flex flex-col items-center gap-[35px] justify-start w-full pt-16 pb-16 px-4 md:px-10"
              >
                <div className="flex flex-col items-center justify-center px-2.5 py-[3px] w-auto">
                  <p className="text-center sm:text-[28px] md:text-[38px] text-[38px] text-orange-500 w-auto font-bold font-shrikhand">
                    Testimonials
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center px-2.5 py-[3px] w-auto">
                  <p className="text-center md:text-5xl text-6xl text-black w-auto font-bold font-Agbalumo">
                    What Others Are Saying
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center px-2.5 py-[3px] w-auto">
                  <p className="text-center sm:text-[21px] md:text-[23px] text-[25px] max-w-xl text-zinc-950_01 font-josefin_sans font-semibold">
                    Lorem ipsum dolor sit amet consectetur. Non tincidunt magna
                    non et elit. Dolor turpis molestie dui magnis facilisis at
                    fringilla quam.
                  </p>
                </div>

                {/* Slideshow */}
                <div
                  className="flex transition-transform duration-500 ease-in-out transform"
                  key={currentSlide}
                >
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className={`bg-white border border-slate-200 rounded-bl-[200px] rounded-br-[200px] rounded-tl-[200px] rounded-tr-[200px] shadow-md max-w-full md:max-w-[928px] p-6 ${currentSlide === index
                          ? "opacity-100"
                          : "opacity-0 absolute"
                        }`}
                    >
                      <div className="flex flex-col items-center justify-center px-6 py-6 w-auto">
                        <img
                          className="flex items-center justify-center h-[117px] md:h-auto rounded-[50%] w-[117px]"
                          src={testimonial.imageSrc}
                          alt={`Testimonial ${index + 1}`}
                        />
                      </div>
                      <div
                        id="text part"
                        className="flex flex-wrap justify-center gap-4 items-center g-white-A700 flex-row p-2 shadow-bs3 w-full"
                      >
                        <div className="flex flex-row items-center justify-center w-auto">
                          <div className="flex items-center justify-center p-2">
                            {/* Controls */}
                            <button
                              onClick={handlePrevSlide}
                              className="p-4 bg-white border border-slate-200 shadow-lg w-8 h-8 flex items-center justify-center focus:outline-none z-10 rounded-full"
                            >
                              &lt;
                            </button>
                            <div className="flex flex-col items-center justify-center px-6 w-auto">
                              {/* Text container with fixed width and height */}
                              <div className="flex items-center justify-center overflow-hidden md:w-[550px] md:h-[100px] w-full h-auto">
                                <p className="text-center text-lg md:text-2xl font-josefin_sans font-semibold line-clamp-3">
                                  {testimonial.textBelowImage}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={handleNextSlide}
                              className="bg-white border border-slate-200 shadow-lg w-8 h-8 flex items-center justify-center focus:outline-none z-10 rounded-full"
                            >
                              &gt;
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-center gap-6 items-center w-full">
                        <div className="flex flex-col items-center justify-center px-6 pb-4 w-auto">
                          <div className="flex flex-wrap justify-center gap-6 items-center g-white-A700 flex-col p-3 shadow-bs3 w-full pb-4">
                            <div className="flex flex-wrap justify-center gap-4 items-center g-white-A700 flex-row pb-8 shadow-bs3 w-full">
                              {Array.from(
                                { length: testimonial.numStars },
                                (_, starIndex) => (
                                  <div
                                    key={starIndex}
                                    className="flex flex-wrap justify-center items-center w-10 h-10"
                                  >
                                    <svg>
                                      <g>
                                        <path
                                          d="M9.70801 36.6667L12.4163 24.9583L3.33301 17.0833L15.333 16.0417L19.9997 5L24.6663 16.0417L36.6663 17.0833L27.583 24.9583L30.2913 36.6667L19.9997 30.4583L9.70801 36.6667Z"
                                          fill="#FE9E0D"
                                        />
                                      </g>
                                    </svg>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-center px-2.5 py-[3px] w-auto">
                            <p className="text-xl md:text-3xl text-center text-gray-500 w-auto font-josefin_sans font-semibold">
                              {testimonial.testimonialAuthor}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* How it Works Section */}
          <div
            id="LP_section_5_orange_How_it_Works"
            className="flex-col sm:flex-col justify-center bg-[#ee9613] border border-solid border-white-A700_19 rounded-bl-[150px] rounded-br-[150px] shadow-xl relative p-16 h-auto"
            style={{ width: "100%", maxWidth: "100vw", margin: "0 auto" }}
          >
            <div className="flex flex-col items-center justify-center w-full -mt-6">
              <div
                id="how-it-works"
                className="flex flex-col items-center justify-center p-2 w-auto"
              >
                <p className="text-center md:text-5xl text-6xl text-black w-auto font-bold font-Agbalumo">
                  How it Works?
                </p>
              </div>
              <div
                id="how-it-works-text"
                className="flex flex-col items-center justify-center p-6 w-auto"
              >
                <p className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-xl text-white font-josefin_sans font-semibold">
                  Lorem ipsum dolor sit amet consectetur. Non tincidunt magna
                  non et elit. Dolor turpis molestie dui magnis facilisis at
                  fringilla quam.
                </p>
              </div>
            </div>
            <div id="cards" className="flex flex-wrap justify-center gap-6">
              <div className="bg-white flex flex-col items-center py-[21px] rounded-[20px] shadow-md w-[480px] h-[350px]">
                <img
                  className="h-[96px] w-[96px] mb-4"
                  src="/images/img_materialsymbol.svg"
                  alt="materialsymbol"
                />
                <div className="text-center p-2">
                  <p
                    id="title"
                    className="text-black text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-xl font-bold mb-2"
                  >
                    Order at Your convenience
                  </p>
                  <div className="text-center p-2">
                    <p
                      id="body"
                      className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xl text-black font-semibold"
                    >
                      Browse through a wide selection of restaurants and shops,
                      and order your favorite meals, groceries, or other
                      essentials.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white flex flex-col items-center py-[21px] rounded-[20px] shadow-md w-[480px] h-[350px]">
                <img
                  className="h-[96px] w-[96px] mb-4"
                  src="/images/img_mdicursorpointer.svg"
                  alt="mdicursorpointe"
                />
                <div className="text-center p-2">
                  <p
                    id="title"
                    className="text-black text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-xl font-bold mb-2"
                  >
                    Fast Delivery
                  </p>
                  <div className="text-center p-2">
                    <p
                      id="body"
                      className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xl text-black font-semibold"
                    >
                      Etomart's fleet of delivery partners ensures your order
                      arrives quickly, so you can enjoy your meals or items
                      wherever and whenever.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white flex flex-col items-center py-[21px] rounded-[20px] shadow-md w-[480px] h-[350px]">
                <img
                  className="h-[96px] w-[96px] mb-4"
                  src="/images/img_mditruckdelivery.svg"
                  alt="mditruckdeliver"
                />
                <div className="text-center p-2">
                  <p
                    id="title"
                    className="text-black text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-xl font-bold mb-2"
                  >
                    Convenient Tracking
                  </p>
                  <div className="text-center p-2">
                    <p
                      id="body"
                      className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xl text-black font-semibold"
                    >
                      Track your order in real-time through the Etomart site, so
                      you always know when your delivery is on its way.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hungry for More Section */}
          <div
            id="LP_Hungry_for_more_than_food_buttons_container_2"
            className="flex items-center justify-center p-8 mx-auto sm:max-w-full md:max-w-screen lg:max-w-screen xl:max-w-screen 2xl:max-w-screen"
            style={{
              maxWidth: "1800px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div className="flex flex-col items-center justify-center px-2.5 py-20 w-auto">
              <h2 className="text-5xl font-Agbalumo font-bold mb-8">
                Hungry for more than food?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
                <div className="p-0 m-2 bg-white shadow-md rounded-lg overflow-hidden border border-solid border-slate-100">
                  <div className="p-0 m-2">
                    <div className="p-0 m-4">
                      <div
                        className="h-96 bg-cover bg-center border border-solid rounded-2xl"
                        style={{
                          backgroundImage:
                            "url(https://consumer-static-assets.wolt.com/frontpage-assets/courier-card-image.jpg)",
                        }}
                      ></div>
                      <div className="text-center p-8">
                        <p
                          id="body"
                          className="text-center text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl font-josefin_sans font-bold text-black mt-4 -mb-6 line-clamp-2"
                          style={{
                            minHeight: "60px",
                            maxHeight: "60px",
                            overflow: "hidden",
                          }}
                        >
                          Get paid as a courier partner.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center p-4 m-2">
                    <a
                      href="https://careers.wolt.com"
                      className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xl inline-block bg-orange-500 hover:bg-orange-800 text-white font-semibold py-2 px-4 rounded"
                    >
                      Apply now
                    </a>
                  </div>
                </div>

                <div className="p-0 m-2 bg-white shadow-md rounded-lg overflow-hidden border border-solid border-slate-100">
                  <div className="p-0 m-2">
                    <div className="p-0 m-4">
                      <div
                        className="h-96 bg-cover bg-center border border-solid rounded-2xl"
                        style={{
                          backgroundImage:
                            "url(https://consumer-static-assets.wolt.com/frontpage-assets/restaurant-card-image.jpg)",
                        }}
                      ></div>
                      <div className="text-center p-8">
                        <p
                          id="body"
                          className="text-center text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl font-josefin_sans font-bold text-black mt-4 -mb-6 line-clamp-2"
                          style={{
                            minHeight: "60px",
                            maxHeight: "60px",
                            overflow: "hidden",
                          }}
                        >
                          Serve more people as a restaurant partner
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center p-4 m-2">
                    <a
                      href="https://careers.wolt.com"
                      className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xl inline-block bg-orange-500 hover:bg-orange-800 text-white font-semibold py-2 px-4 rounded"
                    >
                      Apply now
                    </a>
                  </div>
                </div>

                <div className="p-0 m-2 bg-white shadow-md rounded-lg overflow-hidden border border-solid border-slate-100">
                  <div className="p-0 m-2">
                    <div className="p-0 m-4">
                      <div
                        className="h-96 bg-cover bg-center border border-solid rounded-2xl"
                        style={{
                          backgroundImage:
                            "url(https://consumer-static-assets.wolt.com/frontpage-assets/jobs-card-image.jpg)",
                        }}
                      ></div>
                      <div className="text-center p-8">
                        <p
                          id="body"
                          className="text-center text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl font-josefin_sans font-bold text-black mt-4 -mb-6 line-clamp-2"
                          style={{
                            minHeight: "60px",
                            maxHeight: "60px",
                            overflow: "hidden",
                          }}
                        >
                          Enter a new chapter and find a job at Etomart
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center p-4 m-2">
                    <a
                      href="https://careers.wolt.com"
                      className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xl inline-block bg-orange-500 hover:bg-orange-800 text-white font-semibold py-2 px-4 rounded"
                    >
                      Apply now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer>
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
}

export default RegionHome;
