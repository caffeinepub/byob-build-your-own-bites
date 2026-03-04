import Array "mo:core/Array";
import Order "mo:core/Order";
import Text "mo:core/Text";

actor {
  type MenuItem = {
    name : Text;
    price : Nat;
    category : Category;
  };

  module MenuItem {
    public func compare(a : MenuItem, b : MenuItem) : Order.Order {
      switch (Category.compare(a.category, b.category)) {
        case (#equal) { Text.compare(a.name, b.name) };
        case (order) { order };
      };
    };
  };

  type Category = {
    #main;
    #addOn;
  };

  module Category {
    public func compare(a : Category, b : Category) : Order.Order {
      switch (a, b) {
        case (#main, #addOn) { #less };
        case (#addOn, #main) { #greater };
        case (_, _) { #equal };
      };
    };
  };

  type BusinessInfo = {
    name : Text;
    address : Text;
    phone : Text;
    instagram : Text;
  };

  let menuItems : [MenuItem] = [
    {
      name = "Chicken BYOB";
      price = 80;
      category = #main;
    },
    {
      name = "Veg BYOB";
      price = 70;
      category = #main;
    },
    {
      name = "Extra cheese";
      price = 20;
      category = #addOn;
    },
    {
      name = "Extra chicken";
      price = 30;
      category = #addOn;
    },
    {
      name = "Extra sauces";
      price = 10;
      category = #addOn;
    },
  ];

  let businessInfo : BusinessInfo = {
    name = "BYOB (Build Your Own Bites)";
    address = "Street food, some city, India";
    phone = "1234567890";
    instagram = "@byob.food";
  };

  public query ({ caller }) func getMenuItems() : async [MenuItem] {
    menuItems.sort();
  };

  public query ({ caller }) func getBusinessInfo() : async BusinessInfo {
    businessInfo;
  };
};
