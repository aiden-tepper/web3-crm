import React, { useCallback, useMemo, useState } from "react";
import { Contact } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  ChipProps,
  Chip,
  Tooltip,
  User,
  Button,
  Selection,
  SortDescriptor,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from "@nextui-org/react";
import { PlusIcon, ChevronDownIcon, SearchIcon, DeleteIcon, EditIcon, EyeIcon } from "../assets";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};
const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "POSITION", uid: "position", sortable: true },
  { name: "COMPANY", uid: "company", sortable: true },
  { name: "LOCATION", uid: "location" },
  { name: "TEAM", uid: "team" },
  { name: "EMAIL", uid: "email" },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];
const INITIAL_VISIBLE_COLUMNS = ["name", "position", "company", "actions"];
const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

interface Props {
  contacts: Contact[] | null;
  handleOpen: (key: string) => void;
  setIsDeleteModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setContactToDelete: React.Dispatch<React.SetStateAction<string | null>>;
}

const ContactsTable: React.FC<Props> = ({
  contacts,
  handleOpen,
  setIsDeleteModalVisible,
  setContactToDelete,
}) => {
  /*
    REACT STATES
  */
  const [filterValue, setFilterValue] = useState("");
  const [selectedKey, setSelectedKey] = useState<Selection>(new Set([]));
  // const [_, setPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  // const [rowsPerPage, setRowsPerPage] = useState(15);
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const hasSearchFilter = Boolean(filterValue);

  /*
    REACT MEMOS
  */
  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const items = useMemo(() => {
    if (!contacts) return [];
    let filteredUsers = [...contacts];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) => Array.from(statusFilter).includes(user.status));
    }

    return filteredUsers;
  }, [contacts, filterValue, statusFilter]);

  // const pages = Math.ceil(filteredItems.length / rowsPerPage);

  // const items = useMemo(() => {
  //   const start = (page - 1) * rowsPerPage;
  //   const end = start + rowsPerPage;

  //   return filteredItems.slice(start, end);
  // }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Contact, b: Contact) => {
      const first = a[sortDescriptor.column as keyof Contact] as unknown as number;
      const second = b[sortDescriptor.column as keyof Contact] as unknown as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  /*
    REACT CALLBACKS
  */
  const renderCell = useCallback((user: Contact, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof Contact];

    switch (columnKey) {
      case "name":
        return (
          <User avatarProps={{ radius: "lg", src: user.avatar }} description={user.email} name={cellValue}>
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{user.team}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => handleOpen(String(user._id))}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => onDelete(String(user._id))}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  // const onNextPage = useCallback(() => {
  //   if (page < pages) {
  //     setPage(page + 1);
  //   }
  // }, [page, pages]);

  // const onPreviousPage = useCallback(() => {
  //   if (page > 1) {
  //     setPage(page - 1);
  //   }
  // }, [page]);

  // const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setRowsPerPage(Number(e.target.value));
  //   setPage(1);
  // }, []);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      // setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    // setPage(1);
  }, []);

  const onDelete = useCallback((id: string) => {
    // deleteContact({ id: key }).then((result) => console.log(result));
    setContactToDelete(id);
    setIsDeleteModalVisible(true);
  }, []);

  /* 
   TABLE CONTENT
  */
  // const bottomContent = useMemo(() => {
  //   return (
  //     <div className="py-2 px-2 flex justify-between items-center">
  //       <span className="w-[30%] text-small text-default-400">
  //         {/* {selectedKeys === "all"
  //           ? "All items selected"
  //           : `${selectedKeys.size} of ${filteredItems.length} selected`} */}
  //       </span>
  //       <Pagination
  //         isCompact
  //         showControls
  //         showShadow
  //         color="primary"
  //         page={page}
  //         total={pages}
  //         onChange={setPage}
  //       />
  //       <div className="hidden sm:flex w-[30%] justify-end gap-2">
  //         <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
  //           Previous
  //         </Button>
  //         <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
  //           Next
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }, [selectedKey, items.length, page, pages, hasSearchFilter]);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<PlusIcon />} onPress={() => handleOpen("create")}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {contacts?.length ?? 0} users</span>
          {/* <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label> */}
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    // onRowsPerPageChange,
    contacts?.length,
    hasSearchFilter,
  ]);

  // if (contacts) {
  return (
    // <div className="flex-grow overflow-hidden">
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      classNames={{
        wrapper: "max-h-[calc(100vh-11rem)] overflow-auto",
      }}
      // bottomContent={bottomContent}
      // bottomContentPlacement="outside"
      selectedKeys={selectedKey}
      selectionMode="multiple"
      selectionBehavior="replace"
      onRowAction={(key) => handleOpen(String(key))}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKey}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        // emptyContent={"No users found"}
        items={sortedItems}
        loadingContent={<Spinner color="white" />}
      >
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
    // </div>
  );
  // } else {
  //   return <div>Loading contacts...</div>;
  // }
};

export default ContactsTable;
