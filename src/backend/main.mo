import Time "mo:core/Time";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Nat "mo:core/Nat";

actor {
  type ScoreEntry = {
    playerName : Text;
    score : Nat;
    questions : Nat;
    tables : [Nat];
    timestamp : Int;
  };

  module ScoreEntry {
    func compareTables(tables1 : [Nat], tables2 : [Nat]) : Order.Order {
      if (tables1.size() != tables2.size()) {
        return Int.compare(tables1.size().toInt(), tables2.size().toInt());
      };
      for (i in Nat.range(0, tables1.size())) {
        if (tables1[i] != tables2[i]) {
          return Int.compare(tables1[i], tables2[i]);
        };
      };
      #equal;
    };

    public func compare(entry1 : ScoreEntry, entry2 : ScoreEntry) : Order.Order {
      switch (Int.compare(entry2.score, entry1.score)) {
        case (#equal) {
          switch (Int.compare(entry2.questions, entry1.questions)) {
            case (#equal) {
              switch (Int.compare(entry1.questions, entry2.questions)) {
                case (#equal) {
                  compareTables(entry1.tables, entry2.tables);
                };
                case (order) { order };
              };
            };
            case (order) { order };
          };
        };
        case (order) { order };
      };
    };
  };

  let scores = Map.empty<Text, [ScoreEntry]>();

  public shared ({ caller }) func saveScore(playerName : Text, score : Nat, questions : Nat, tables : [Nat]) : async () {
    let entry : ScoreEntry = {
      playerName;
      score;
      questions;
      tables;
      timestamp = Time.now();
    };

    let existingScores = switch (scores.get(playerName)) {
      case (null) { [entry] };
      case (?entries) { entries.concat([entry]) };
    };

    scores.add(playerName, existingScores);
  };

  public query ({ caller }) func getLeaderboard() : async [ScoreEntry] {
    let allScores = scores.values().toArray().flatten();
    allScores.sort().sliceToArray(0, Int.min(allScores.size(), 10));
  };

  public query ({ caller }) func getScoresByPlayer(playerName : Text) : async [ScoreEntry] {
    switch (scores.get(playerName)) {
      case (null) { [] };
      case (?entries) { entries };
    };
  };

  public query ({ caller }) func getTotalGames() : async Nat {
    let allScores = scores.values().toArray().flatten();
    allScores.size();
  };
};
