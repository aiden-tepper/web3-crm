// InteractionForm.tsx
import React from "react";
import { useAppContext } from "../context/useAppContext";
import { useInteractions } from "../hooks/useInteractions";
import {
  Tooltip,
  Input,
  Textarea,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { PhoneIcon, VideoCallIcon, EmailIcon, CoffeeIcon } from "../assets";
import { Id } from "../../convex/_generated/dataModel";

interface Props {
  contactId: string;
  isOpen: boolean;
  onClose: () => void;
}

const InteractionForm: React.FC<Props> = ({ contactId, isOpen, onClose }) => {
  const {
    handleInteractionFieldChange,
    editableInteraction,
    interactionMode,
    setInteractionMode,
    selectedContact,
    setSelectedInteraction,
  } = useAppContext();

  const { updateInteraction, createInteraction, deleteInteraction } = useInteractions({ contactId });

  const handleInteractionSave = () => {
    if (interactionMode === "create") {
      createInteraction({
        interaction: {
          contactId: selectedContact?._id as Id<"contacts">,
          type: editableInteraction?.type || "",
          datetime: editableInteraction?.datetime || currDate,
          notes: editableInteraction?.notes || "",
        },
      }).then((result) => console.log(result));
    } else if (interactionMode === "edit") {
      updateInteraction({
        id: editableInteraction?._id as Id<"interactions">,
        updates: {
          contactId: selectedContact?._id as Id<"contacts">,
          type: editableInteraction?.type || "",
          datetime: editableInteraction?.datetime || "",
          notes: editableInteraction?.notes || "",
        },
      }).then((result) => console.log(result));
      setSelectedInteraction(editableInteraction);
    }
    setInteractionMode("view");
    onClose();
  };

  const handleInteractionCancel = () => {
    setInteractionMode("view");
    onClose();
  };

  const handleInteractionDelete = () => {
    if (editableInteraction?._id) {
      deleteInteraction({ id: editableInteraction._id as Id<"interactions"> }).then((result) =>
        console.log(result)
      );
    }
    setInteractionMode("view");
    setSelectedInteraction(null);
    onClose();
  };

  const interaction = editableInteraction || { _id: "", contactId: "", type: "", datetime: "", notes: "" };

  const getIconColor = (type: string) => {
    return editableInteraction?.type === type ? "text-red-500" : "text-default-400";
  };

  const currDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
  }).format(new Date());

  return (
    <Modal
      size="full"
      isOpen={isOpen}
      onClose={onClose}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {interactionMode === "edit" && "Edit Interaction"}
          {interactionMode === "create" && "Create Interaction"}
        </ModalHeader>
        <ModalBody>
          <div className="relative flex items-center gap-2">
            <p>Type: </p>
            <Tooltip content="phone call">
              <span
                className={`text-lg ${getIconColor("phone call")} cursor-pointer active:opacity-50`}
                onClick={() => handleInteractionFieldChange("type", "phone call")}
              >
                <PhoneIcon />
              </span>
            </Tooltip>
            <Tooltip content="video call">
              <span
                className={`text-lg ${getIconColor("video call")} cursor-pointer active:opacity-50`}
                onClick={() => handleInteractionFieldChange("type", "video call")}
              >
                <VideoCallIcon />
              </span>
            </Tooltip>
            <Tooltip content="email">
              <span
                className={`text-lg ${getIconColor("email")} cursor-pointer active:opacity-50`}
                onClick={() => handleInteractionFieldChange("type", "email")}
              >
                <EmailIcon />
              </span>
            </Tooltip>
            <Tooltip content="in-person">
              <span
                className={`text-lg ${getIconColor("in-person")} cursor-pointer active:opacity-50`}
                onClick={() => handleInteractionFieldChange("type", "in-person")}
              >
                <CoffeeIcon />
              </span>
            </Tooltip>
          </div>
          <Input
            label="Date"
            placeholder="Enter date"
            type="date"
            value={interaction.datetime || currDate}
            onValueChange={(e) => handleInteractionFieldChange("datetime", e)}
          />
          <Textarea
            variant="flat"
            label="Notes"
            labelPlacement="outside"
            placeholder="Type notes from this interaction here..."
            classNames={{
              base: "max-w",
              input: "resize-y min-h-[500px]",
            }}
            disableAutosize
            value={interaction.notes}
            onValueChange={(e) => handleInteractionFieldChange("notes", e)}
          />
        </ModalBody>
        <ModalFooter>
          <Button onPress={handleInteractionCancel}>Cancel</Button>
          <Button onPress={handleInteractionSave}>Save</Button>
          {interactionMode === "edit" && <Button onPress={handleInteractionDelete}>Delete</Button>}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InteractionForm;
