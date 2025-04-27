import NotesTable from "./(table)";

export default function Notes() {
  return (
    <div className="p-4 overflow-y-auto space-y-4">
      <h1 className="text-xl font-semibold">Portfolio Notes</h1>
      <NotesTable />
    </div>
  );
}
