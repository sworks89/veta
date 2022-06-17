import Array "mo:base/Array";
import Error "mo:base/Error";
import Option "mo:base/Option";
import Text "mo:base/Text";

import Types "types";

module {

  type UserId = Types.UserId;

  // Connections
  public func includes(x: UserId, xs: [UserId]): Bool {
    func isX(y: UserId): Bool { x == y };
    switch (Array.find<UserId>(xs, isX)) {
      case (null) { false };
      case (_) { true };
    };
  };

  // Authorization
  let adminIds: [UserId] = [];

  public func isAdmin(userId: UserId): Bool {
    func identity(x: UserId): Bool { x == userId };
    Option.isSome(Array.find<UserId>(adminIds,identity))
  };

  public func hasAccess(userId: UserId, profile: Profile): Bool {
    userId == profile.id or isAdmin(userId)
  };

	public func signData(): Text {
		"this_is_a_signature";	
	};

	public func validateSignature(): Bool {
	
	};
};