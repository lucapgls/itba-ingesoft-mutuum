import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Modal,
    RefreshControl
} from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import LoanCard from "../../components/LoanCard";
import CustomButton from "../../components/CustomButton";
import { getLoans, loadLoans } from "../../store/LoanStore";
import CustomTextInput from "../../components/CustomTextInput";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import theme from "@theme/theme";
import { Skeleton } from "moti/skeleton";
import UserStore from "store/UserStore";
import { fetchUser } from "api/user";

const Explore = () => {
    const [loans, setLoans] = useState<any[]>([]);
    const [searchText, setSearchText] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sortOption, setSortOption] = useState({
        field: "initial_amount",
        order: "asc",
    });
    const [tempField, setTempField] = useState("initial_amount");
    const [tempOrder, setTempOrder] = useState("asc");
    const [isLoading, setIsLoading] = useState(true);
    const [lenders, setLenders] = useState<{ [key: string]: any }>({});

    const sortLoans = (field: any, order: any) => {
        const sortedLoans = [...loans].sort((a, b) => {
            if (order === "asc") {
                return a[field] - b[field];
            } else {
                return b[field] - a[field];
            }
        });
        setLoans(sortedLoans);
    };

    const openModal = () => {
        setTempField(sortOption.field);
        setTempOrder(sortOption.order);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const toggleTempSortOrder = () => {
        setTempOrder(tempOrder === "asc" ? "desc" : "asc");
    };

    const applySort = () => {
        setSortOption({ field: tempField, order: tempOrder });
        sortLoans(tempField, tempOrder);
        closeModal();
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            await loadLoans();
            const loansArray = getLoans();
            setLoans(loansArray);

            const lenderPromises = loansArray.map(async (loan) => {
                const user = await fetchUser(loan.lender_id);
                return { lender_id: loan.lender_id, display_name: user[0].display_name };
            });

            const lenderData = await Promise.all(lenderPromises);
            const lenderMap = lenderData.reduce((acc: { [key: string]: string }, lender) => {
                acc[lender.lender_id] = lender.display_name;
                return acc;
            }, {});

            setLenders(lenderMap);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={styles.safeArea}>
            <View style={styles.container}>
                <View style={{ height: 50 }} />

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <View style={styles.searchSection}>
                        <FontAwesome
                            name="search"
                            size={20}
                            style={styles.searchIcon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Buscar préstamos"
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.filterButton}
                        onPress={openModal}
                    >
                        <Ionicons
                            name="filter"
                            size={20}
                            color={theme.colors.textBlack}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}
            refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
              }>
                <Text style={styles.title}>Explorar préstamos</Text>

                <View style={{ height: 10 }} />
                
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <View key={index}>
                          <View style={[theme.shadowIOS, theme.shadowAndroid]}>
                            <Skeleton
                              height={100}
                              width={"100%"}
                              colorMode="light"
                              radius={20}
                            />
                          </View>
                          <View style={{ height: 16 }} />
                        </View>))
                ) : (
                    loans.map((loan) => (
                        <View style={styles.card} key={loan.id}>
                            <LoanCard
                                lender_name={lenders[loan.lender_id] || "Nombre"}
                                id={loan.lender_id}
                                currency={loan.currency ?? "USD"}
                                amount={loan.initial_amount ?? 0}
                                interest={loan.interest ?? 0}
                                term={loan.term ?? 0}
                                requirements={loan.requirements ?? []}
                                onPress={() =>
                                    console.log(`Pressed loan ${loan.id}`)
                                }
                            />
                        </View>
                    ))
                )}

                <View style={{ height: 8 }} />
                
            </ScrollView>

            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Ordenar por</Text>
                        <Picker
                            selectedValue={tempField}
                            onValueChange={(itemValue) =>
                                setTempField(itemValue || "initial_amount")
                            }
                            style={styles.picker}
                        >
                            <Picker.Item label="Monto" value="initial_amount" />
                            <Picker.Item label="Interés" value="interest" />
                        </Picker>
                        <TouchableOpacity onPress={toggleTempSortOrder}>
                            <View style={styles.modalOption}>
                                <Text style={styles.modalOptionText}>
                                    Orden{" "}
                                </Text>
                                {tempOrder === "asc" ? (
                                    <Ionicons
                                        name="arrow-down-outline"
                                        size={18}
                                        style={{ marginLeft: 5 }}
                                    />
                                ) : (
                                    <Ionicons
                                        name="arrow-up-outline"
                                        size={18}
                                        style={{ marginLeft: 5 }}
                                    />
                                )}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={applySort}>
                            <Text style={styles.closeButton}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: "flex-start",
    },
    container: {
        paddingHorizontal: 20,
    },
    searchSection: {
        flexDirection: "row",
        alignItems: "center",

        borderRadius: 10,
        paddingHorizontal: 10,
        width: "85%",
        marginVertical: 15,
        backgroundColor: "white",
    },
    searchIcon: {
        marginRight: 10,
        color: theme.colors.iconGray,
    },
    input: {
        flex: 1,
        height: 40,
    },
    scrollContainer: {
        paddingHorizontal: 20,
        backgroundColor: theme.colors.background,
    },
    title: {
        fontSize: 18,
        fontWeight: "500",
    },
    card: {
        marginBottom: 0, // Fixed space between cards
    },
    button: {
        backgroundColor: theme.colors.primary,
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 16,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    filterButton: {
        borderRadius: 10,
        backgroundColor: "white",
        height: 40,
        width: 40,

        padding: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: 300,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 20,
    },
    modalOption: {
        fontSize: 18,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
    },

    modalOptionText: {
        fontSize: 16,
    },
    closeButton: {
        color: theme.colors.primary,
        fontSize: 18,
        marginTop: 20,
    },
    picker: {
        width: "100%",
        marginBottom: 0,
    },
});

export default Explore;