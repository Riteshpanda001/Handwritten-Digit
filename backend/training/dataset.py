"""
Dataset loader for MNIST IDX binary format files.
"""
import os
import struct
import numpy as np
import torch
from torch.utils.data import Dataset, DataLoader
from typing import Tuple, Optional


def load_idx_images(file_path: str) -> np.ndarray:
    """Read MNIST idx3-ubyte image file into numpy array (N, 28, 28)."""
    with open(file_path, 'rb') as f:
        magic, num_images, rows, cols = struct.unpack(">IIII", f.read(16))
        if magic != 2051:
            raise ValueError(f"Invalid magic number {magic} in image file {file_path}")
        images = np.frombuffer(f.read(), dtype=np.uint8)
        return images.reshape(num_images, rows, cols)


def load_idx_labels(file_path: str) -> np.ndarray:
    """Read MNIST idx1-ubyte label file into numpy array (N,)."""
    with open(file_path, 'rb') as f:
        magic, num_labels = struct.unpack(">II", f.read(8))
        if magic != 2049:
            raise ValueError(f"Invalid magic number {magic} in label file {file_path}")
        labels = np.frombuffer(f.read(), dtype=np.uint8)
        return labels


class MNISTDataset(Dataset):
    """PyTorch Dataset wrapper for local MNIST binary idx files."""

    def __init__(self, images_path: str, labels_path: str, transform=None):
        self.images = load_idx_images(images_path)
        self.labels = load_idx_labels(labels_path)
        self.transform = transform

    def __len__(self) -> int:
        return len(self.labels)

    def __getitem__(self, idx: int) -> Tuple[torch.Tensor, int]:
        img = self.images[idx]
        label = int(self.labels[idx])

        # Normalize pixel values to [0, 1] float tensor of shape (1, 28, 28)
        img_tensor = torch.from_numpy(img.copy()).float().unsqueeze(0) / 255.0

        if self.transform:
            img_tensor = self.transform(img_tensor)

        return img_tensor, label


def get_data_loaders(
    archive_dir: str,
    batch_size: int = 64,
    shuffle: bool = True
) -> Tuple[DataLoader, DataLoader]:
    """
    Locates MNIST idx files in archive_dir and returns train and test PyTorch DataLoaders.
    Handles direct idx files or extracted subfolder structures in archive_dir.
    """
    train_img = os.path.join(archive_dir, "train-images.idx3-ubyte")
    train_lbl = os.path.join(archive_dir, "train-labels.idx1-ubyte")
    test_img = os.path.join(archive_dir, "t10k-images.idx3-ubyte")
    test_lbl = os.path.join(archive_dir, "t10k-labels.idx1-ubyte")

    # Fallback to subfolder paths if binary files are nested inside subfolders
    if not os.path.exists(train_img):
        train_img = os.path.join(archive_dir, "train-images-idx3-ubyte", "train-images.idx3-ubyte")
    if not os.path.exists(train_lbl):
        train_lbl = os.path.join(archive_dir, "train-labels-idx1-ubyte", "train-labels.idx1-ubyte")
    if not os.path.exists(test_img):
        test_img = os.path.join(archive_dir, "t10k-images-idx3-ubyte", "t10k-images.idx3-ubyte")
    if not os.path.exists(test_lbl):
        test_lbl = os.path.join(archive_dir, "t10k-labels-idx1-ubyte", "t10k-labels.idx1-ubyte")

    if not (os.path.exists(train_img) and os.path.exists(train_lbl)):
        raise FileNotFoundError(f"Train dataset files not found in {archive_dir}")

    train_ds = MNISTDataset(train_img, train_lbl)
    test_ds = MNISTDataset(test_img, test_lbl)

    train_loader = DataLoader(train_ds, batch_size=batch_size, shuffle=shuffle)
    test_loader = DataLoader(test_ds, batch_size=batch_size, shuffle=False)

    return train_loader, test_loader
