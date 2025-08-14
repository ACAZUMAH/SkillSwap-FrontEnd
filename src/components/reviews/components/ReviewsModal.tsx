import { useState } from "react";
import {
  Modal,
  Button,
  Group,
  Stack,
  Text,
  Textarea,
  Rating,
} from "@mantine/core";
import { useReviewMutation } from "../hooks/useReviewMutation";
import { useAppAuthentication } from "src/hooks";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  revieweeName: string;
  revieweeId: string;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  revieweeName,
  revieweeId,
}) => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const { user } = useAppAuthentication();
  const { createReview, loading } = useReviewMutation();

  const handleSubmit = async () => {
    const res = await createReview({
      reviewerId: user?.id!,
      revieweeId,
      comments,
      ratings: rating,
    });
    if (res) {
      setRating(0);
      setComments("");
      onClose();
    }
  };

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={
        <Text size="xl" fw={700}>
          Review {revieweeName}
        </Text>
      }
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      size="lg"
    >
      <Stack gap="md">
        <Text c="gray.4" size="sm">
          Share your experience to help others.
        </Text>
        <Stack gap={4}>
          <Text size="sm" c="gray.3" fw={500}>
            Rating
          </Text>
          <Rating
            value={rating}
            onChange={setRating}
            size="lg"
            count={5}
            color="yellow"
          />
        </Stack>
        <Stack gap={4}>
          <Text size="sm" c="gray.3" fw={500}>
            Comments
          </Text>
          <Textarea
            placeholder="What was your experience like?"
            value={comments}
            onChange={(e) => setComments(e.currentTarget.value)}
            minRows={5}
            maxLength={500}
            styles={{
              input: {
                background: "#2a2a2a",
                color: "white",
                borderColor: "#444",
              },
            }}
          />
          <Text size="xs" c="gray.5" ta="right">
            {comments.length} / 500 characters
          </Text>
        </Stack>
        <Group justify="flex-end" mt="md">
          <Button
            onClick={handleSubmit}
            loading={loading}
            disabled={rating === 0 || loading}
            color="blue"
            style={{ color: "white" }}
          >
            Submit Review
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
