const targetUser = db.getUser("mongouser");
if (!targetUser) {
  db.createUser({
    user: "restaurant",
    pwd: "restaurant",
    roles: [
      { role: "clusterAdmin", db: "restaurant" },
      { role: "dbAdminAnyDatabase", db: "restaurant" },
      { role: "userAdminAnyDatabase", db: "restaurant" },
      { role: "readWriteAnyDatabase", db: "restaurant" },
    ],
  });
}
