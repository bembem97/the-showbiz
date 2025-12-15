import prisma from "@/lib/prisma";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <div className="p-2">
      <h1>Welcome to the Showbiz</h1>

      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemText primary={user.name} secondary={user.email} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
